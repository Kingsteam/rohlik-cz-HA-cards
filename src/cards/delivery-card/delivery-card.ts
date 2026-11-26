import { html, nothing, type TemplateResult, type CSSResultGroup } from "lit";
import { customElement, state as litState } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { RohlikBaseCard, type RohlikCardConfig } from "../../core/base-card";
import type { HomeAssistant, LovelaceGridOptions } from "../../core/types";
import { registerCard, suggestForKeys } from "../../core/register";
import { sharedStyles } from "../../core/styles";
import { getConfigEntryId, callRohlik, openMoreInfo } from "../../core/actions";
import { formatTime, formatRelativeDay, formatCountdown, formatDistance, formatMinutes } from "../../core/format";
import {
  computeDeliveryState,
  findReservedUntil,
  arrivingHeadline,
  type ArrivingHeadline,
  type DeliveryPhase,
  type DeliverySlotKey,
  type DeliverySlotView,
  type DeliveryStateInput,
  type DeliveryView,
} from "./state";
import { readDeliveryInput } from "./input";
import { deliveryCardStyles } from "./styles";
import { strings } from "./strings";
import "./editor";

export interface DeliveryCardConfig extends RohlikCardConfig {
  type: "custom:rohlik-delivery-card";
  show_announcement?: boolean;
  show_order_summary?: boolean;
  show_express_chip?: boolean;
  show_refresh?: boolean;
  /** Show up to three compact upcoming-slot rows in the "no order" state. */
  show_slots?: boolean;
  /** Show the "Order again on <shop>" link in the "delivered" state. */
  show_shop_link?: boolean;
  /** Show live courier tracking (status steps, stops, distance) when available. */
  show_tracking?: boolean;
  /** In the last 90 minutes, make the minutes left the headline (HA-RohlikCZ 1.3+). */
  show_countdown?: boolean;
  compact?: boolean;
  tap_action?: string | { action?: string };
}

const CHIP_KIND: Record<DeliveryView["state"], "ok" | "neutral"> = {
  arriving: "ok",
  ordered: "neutral",
  delivered: "ok",
  none: "neutral",
};

const PHASE_STEPS: readonly DeliveryPhase[] = ["queued", "on_the_way", "at_door", "delivered"];

const SLOT_ICON: Record<DeliverySlotKey, string> = {
  express: "mdi:lightning-bolt",
  standard: "mdi:truck-delivery",
  eco: "mdi:leaf",
};

/**
 * "Next delivery" card: renders `computeDeliveryState`'s output for the
 * `is_ordered` / `next_order_*` / `delivery_time` / `delivery_info` /
 * `last_order` / `first_delivery` / `is_reserved` / `is_express_available`
 * entities on the configured device.
 */
@customElement("rohlik-delivery-card")
export class RohlikDeliveryCard extends RohlikBaseCard<DeliveryCardConfig> {
  static styles: CSSResultGroup = [sharedStyles, deliveryCardStyles];

  protected readonly strings = strings;

  @litState() private refreshing = false;

  @litState() private refreshError: string | null = null;

  private tickTimer: ReturnType<typeof setInterval> | undefined;

  public static getConfigElement(): HTMLElement {
    return document.createElement("rohlik-delivery-card-editor");
  }

  public static getStubConfig(hass: HomeAssistant): Partial<DeliveryCardConfig> {
    return { ...RohlikBaseCard.getStubConfig(hass), type: "custom:rohlik-delivery-card" };
  }

  public connectedCallback(): void {
    super.connectedCallback();
    // Countdowns, the ETA progress marker and "delivered" ageing all move on
    // their own — re-render periodically so they stay accurate without
    // requiring a `hass` update.
    this.tickTimer = setInterval(() => this.requestUpdate(), 30_000);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.tickTimer !== undefined) {
      clearInterval(this.tickTimer);
      this.tickTimer = undefined;
    }
  }

  protected estimatedCardSize(): number {
    if (this.config?.compact) return 2;
    // An active order shows the window, tracking and summary rows.
    return this.isOn("is_ordered") ? 10 : 7;
  }

  public getGridOptions(): LovelaceGridOptions {
    // Compact is a single line (~90 px), so two rows (120 px) always fit.
    // The full card's height varies a lot by state (tracking stepper, slots,
    // announcement), so it is sized to its content.
    return this.config?.compact
      ? { columns: 6, rows: 2, min_columns: 6, min_rows: 2 }
      : { columns: 12, rows: "auto", min_columns: 6, min_rows: 3 };
  }

  private buildInput(): DeliveryStateInput {
    return readDeliveryInput((key) => this.state(key), this.config.device);
  }

  private getView(): DeliveryView {
    return computeDeliveryState(this.buildInput(), new Date());
  }

  private get tapDisabled(): boolean {
    const action = this.config?.tap_action;
    if (action === "none") return true;
    if (action && typeof action === "object" && action.action === "none") return true;
    return false;
  }

  private onHeaderTap = (): void => {
    if (this.tapDisabled) return;
    const entityId = this.entityId("is_ordered");
    if (entityId) openMoreInfo(this, entityId);
  };

  private onHeaderKeydown = (ev: KeyboardEvent): void => {
    if (this.tapDisabled) return;
    if (ev.key !== "Enter" && ev.key !== " ") return;
    ev.preventDefault();
    this.onHeaderTap();
  };

  private onRefresh = async (ev: Event): Promise<void> => {
    ev.stopPropagation();
    if (this.refreshing) return;
    const entityId = this.entityId("is_ordered");
    if (!entityId) return;
    this.refreshing = true;
    this.refreshError = null;
    try {
      const configEntryId = await getConfigEntryId(this.hass, entityId);
      if (!configEntryId) throw new Error("no config entry");
      const view = this.getView();
      const service = view.state === "arriving" || view.state === "ordered"
        ? "update_delivery_times"
        : "refresh_slots";
      await callRohlik(this.hass, configEntryId, service);
    } catch {
      this.refreshError = this.t("refresh_failed");
    } finally {
      this.refreshing = false;
    }
  };

  protected render(): TemplateResult | typeof nothing {
    if (!this.config) return nothing;

    if (!this.entityId("is_ordered")) {
      return html`
        <ha-card style=${styleMap(this.accentStyle)}>${this.renderError(this.t("no_entities"))}</ha-card>
      `;
    }

    const view = this.getView();

    return html`
      <ha-card class=${classMap(this.closeClass(view))} style=${styleMap(this.accentStyle)}>
        ${this.config.compact ? this.renderCompact(view) : this.renderFull(view)}
      </ha-card>
    `;
  }

  /** Status chip: the tracked phase when known, else the coarse state. */
  private renderStateChip(view: DeliveryView): TemplateResult {
    const phase = view.state === "delivered" ? null : view.tracking.phase;
    const kind = phase === "at_door" ? "warn" : phase === "queued" ? "neutral" : CHIP_KIND[view.state];
    const label = phase ? this.t(`phase_${phase}`) : this.t(`chip_${view.state}`);
    return html`<span class="chip ${kind}">${label}</span>`;
  }

  private renderChips(view: DeliveryView): TemplateResult {
    const showExpress = this.config.show_express_chip !== false && view.isExpressAvailable;
    const showReserved = view.state === "none" && view.isReserved;
    return html`
      <div class="chips">
        ${this.renderStateChip(view)}
        ${showExpress ? html`<span class="chip warn">${this.t("chip_express")}</span>` : nothing}
        ${showReserved ? html`<span class="chip neutral">${this.t("chip_reserved")}</span>` : nothing}
      </div>
    `;
  }

  private renderCompact(view: DeliveryView): TemplateResult {
    return html`
      <div
        class="compact-row"
        @click=${this.onHeaderTap}
        @keydown=${this.onHeaderKeydown}
        role=${this.tapDisabled ? nothing : "button"}
        tabindex=${this.tapDisabled ? nothing : "0"}
      >
        <ha-icon icon="mdi:truck-delivery"></ha-icon>
        <div class="headline">
          <span class="big">${this.headlineMain(view, true)}</span>
        </div>
        ${this.renderStateChip(view)}
      </div>
    `;
  }

  private renderFull(view: DeliveryView): TemplateResult {
    const showAnnouncement =
      this.config.show_announcement !== false &&
      (view.state === "arriving" || view.state === "ordered") &&
      !!view.announcementText;
    const showSummary = this.config.show_order_summary !== false && view.summaryItems != null;
    const showRefresh = this.config.show_refresh !== false;
    const showSub =
      (view.state === "arriving" || view.state === "ordered") && !!view.since && !!view.till;
    const showSlots = this.config.show_slots !== false && view.state === "none" && view.slots.length > 0;
    const showShopLink = this.config.show_shop_link !== false && view.state === "delivered";
    const showTracking =
      this.config.show_tracking !== false &&
      (view.state === "arriving" || view.state === "ordered") &&
      view.tracking.phase != null;
    const reservedUntil =
      view.state === "none" && view.isReserved
        ? findReservedUntil(this.state("is_reserved")?.attributes)
        : null;
    const caption = this.headlineCaption(view);

    return html`
      <div
        class=${classMap({ header: true, static: this.tapDisabled })}
        @click=${this.onHeaderTap}
        @keydown=${this.onHeaderKeydown}
        role=${this.tapDisabled ? nothing : "button"}
        tabindex=${this.tapDisabled ? nothing : "0"}
      >
        <ha-icon icon="mdi:truck-delivery"></ha-icon>
        <span class="title">${this.config.name || this.t("title")}</span>
        ${this.renderChips(view)}
      </div>

      <div class="headline">
        <span class="big">${this.headlineMain(view)}</span>
      </div>
      ${caption ? html`<div class="caption">${caption}</div>` : nothing}

      ${showSub ? html`<div class="sub">${this.renderSub(view)}</div>` : nothing}
      ${showTracking ? this.renderTracking(view) : nothing}
      ${view.state === "arriving" ? this.renderTrack(view) : nothing}
      ${reservedUntil
        ? html`<div class="reserved-line">${this.t("reserved_until", { time: formatTime(this.hass, reservedUntil) })}</div>`
        : nothing}
      ${showSlots ? this.renderSlots(view) : nothing}
      ${showAnnouncement ? html`<div class="row">${this.renderAnnouncement(view)}</div>` : nothing}
      ${showSummary ? html`<div class="row">${this.renderSummary(view)}</div>` : nothing}
      ${this.refreshError ? html`<div class="error">${this.refreshError}</div>` : nothing}
      ${showRefresh || showShopLink
        ? html`
            <div class="actions">
              ${showShopLink
                ? html`
                    <a class="btn ghost" href=${this.shop.url} target="_blank" rel="noopener">
                      ${this.t("shop_link", { shop: this.shop.name })}
                    </a>
                  `
                : nothing}
              ${showRefresh
                ? html`
                    <button class="btn ghost" ?disabled=${this.refreshing} @click=${this.onRefresh}>
                      <ha-icon
                        icon="mdi:refresh"
                        class=${classMap({ spin: this.refreshing })}
                      ></ha-icon>
                      ${this.t("refresh")}
                    </button>
                  `
                : nothing}
            </div>
          `
        : nothing}
      ${this.renderFreshness()}
    `;
  }

  private renderSlots(view: DeliveryView): TemplateResult {
    return html`<div class="slots">${view.slots.map((slot) => this.renderSlotRow(slot))}</div>`;
  }

  private renderSlotRow(slot: DeliverySlotView): TemplateResult {
    const day = formatRelativeDay(this.hass, slot.start, {
      today: this.t("today"),
      tomorrow: this.t("tomorrow"),
    });
    const price = slot.price === 0 ? this.t("free") : slot.price != null ? this.money(slot.price) : "";
    return html`
      <div class="slot-row">
        <ha-icon icon=${SLOT_ICON[slot.key]}></ha-icon>
        <span class="slot-label">${this.t(`slot_${slot.key}`)}</span>
        <span class="slot-day">${day}</span>
        <span class="slot-price">${price}</span>
      </div>
    `;
  }

  /** The arriving headline; `compact` and `show_countdown: false` keep the clock time. */
  private arriving(view: DeliveryView, compact = false): ArrivingHeadline {
    return arrivingHeadline(view, new Date(), !compact && this.config.show_countdown !== false);
  }

  /** The courier is close: the card frame takes the accent (amber at the door). */
  private closeClass(view: DeliveryView): Record<string, boolean> {
    const active = view.state === "arriving" && this.config.show_countdown !== false;
    const atDoor = active && view.tracking.phase === "at_door";
    return { "last-mile": active && view.tracking.lastMile && !atDoor, "at-door": atDoor };
  }

  private headlineMain(view: DeliveryView, compact = false): string {
    switch (view.state) {
      case "arriving": {
        const head = this.arriving(view, compact);
        switch (head.kind) {
          case "now":
            return this.t("now");
          case "countdown":
            return formatMinutes(this.hass, head.minutes);
          case "eta":
          case "by":
            return formatTime(this.hass, head.at);
          default:
            return "—";
        }
      }
      case "ordered":
        return view.since
          ? formatRelativeDay(this.hass, view.since, { today: this.t("today"), tomorrow: this.t("tomorrow") })
          : view.tracking.phase
            ? this.t(`phase_${view.tracking.phase}`)
            : "—";
      case "delivered":
        return view.deliveredAt ? formatTime(this.hass, view.deliveredAt) : "—";
      case "none":
      default:
        return view.firstDeliveryText ?? "—";
    }
  }

  private headlineCaption(view: DeliveryView): string {
    switch (view.state) {
      case "arriving": {
        const head = this.arriving(view);
        if (head.kind === "now" || head.kind === "none") return "";
        if (head.kind === "by" || !view.eta) return this.t("by");
        const counting = head.kind === "countdown";
        // With the countdown as the headline, the clock time moves here.
        const parts = [counting ? this.t("estimated_at", { time: formatTime(this.hass, view.eta) }) : this.t("estimated")];
        const source = view.tracking.etaSource;
        // A `slot` source never gets here: input.ts drops that "ETA".
        if (source) parts.push(this.t(`source_${source}`));
        // The card re-renders every 30 s, so a seconds countdown would go stale.
        if (!counting && view.eta.getTime() - Date.now() >= 60_000) parts.push(formatCountdown(this.hass, view.eta));
        return parts.join(" · ");
      }
      case "ordered":
        return view.since ? formatCountdown(this.hass, view.since) : "";
      case "delivered":
        return this.t("delivered_caption");
      case "none":
      default:
        return this.t("nearest_slot");
    }
  }

  private renderSub(view: DeliveryView): TemplateResult | typeof nothing {
    if (!view.since || !view.till) return nothing;
    const dayLabel = formatRelativeDay(this.hass, view.since, {
      today: this.t("today"),
      tomorrow: this.t("tomorrow"),
    });
    const parts = [`${this.t("window")} ${dayLabel} – ${formatTime(this.hass, view.till)}`];
    if (view.orderId != null) parts.push(`${this.t("order")} ${view.orderId}`);
    return html`${parts.join(" · ")}`;
  }

  /** Status steps plus a "2 stops before you · 1.4 km away" facts line. */
  private renderTracking(view: DeliveryView): TemplateResult {
    const { phase, stopsBefore, distanceM, lastMile } = view.tracking;
    const current = phase ? PHASE_STEPS.indexOf(phase) : -1;
    const facts: string[] = [];
    if (phase === "at_door") {
      facts.push(this.t("courier_at_door"));
    } else if (stopsBefore != null) {
      facts.push(stopsBefore === 0 ? this.t("you_are_next") : this.t("stops_before", { count: stopsBefore }));
    }
    if (distanceM != null && phase !== "at_door") {
      facts.push(this.t("distance_away", { distance: formatDistance(this.hass, distanceM) }));
    }
    if (lastMile && phase !== "at_door" && !facts.length) facts.push(this.t("courier_close"));
    return html`
      <ol class="steps" aria-label=${this.t("tracking")}>
        ${PHASE_STEPS.map(
          (step, i) => html`
            <li
              class=${classMap({ step: true, done: i < current, current: i === current })}
              aria-current=${i === current ? "step" : nothing}
            >
              <span class="dot"></span>
              <span class="step-label">${this.t(`step_${step}`)}</span>
            </li>
          `,
        )}
      </ol>
      ${facts.length
        ? html`<div class=${classMap({ "tracking-facts": true, alert: phase === "at_door" })}>
            <ha-icon icon=${phase === "at_door" ? "mdi:door-open" : "mdi:map-marker-path"}></ha-icon>
            <span>${facts.join(" · ")}</span>
          </div>`
        : nothing}
    `;
  }

  private renderTrack(view: DeliveryView): TemplateResult | typeof nothing {
    if (!view.since || !view.till || view.progress == null) return nothing;
    const mid = new Date((view.since.getTime() + view.till.getTime()) / 2);
    return html`
      <div class="track-wrap">
        <div class="track">
          <div class="track-fill" style=${styleMap({ width: `${view.progress * 100}%` })}></div>
          <div class="track-marker" style=${styleMap({ left: `${view.progress * 100}%` })}></div>
        </div>
        <div class="ticks">
          <span>${formatTime(this.hass, view.since)}</span>
          <span>${formatTime(this.hass, mid)}</span>
          <span>${formatTime(this.hass, view.till)}</span>
        </div>
      </div>
    `;
  }

  private renderAnnouncement(view: DeliveryView): TemplateResult {
    return html`
      <div class="announce">
        <span class="text">${view.announcementText}</span>
        <span class="meta">
          ${view.announcementUpdatedAt
            ? this.t("announcement_updated", { time: formatTime(this.hass, view.announcementUpdatedAt) })
            : nothing}
          ${view.announcementExtra ? ` · ${view.announcementExtra}` : nothing}
        </span>
      </div>
    `;
  }

  private renderSummary(view: DeliveryView): TemplateResult {
    const itemsLabel = this.t("items_count", { count: view.summaryItems ?? 0 });
    const priceLabel = view.summaryPrice != null ? this.money(view.summaryPrice) : "";
    return html`<span>${[itemsLabel, priceLabel].filter(Boolean).join(" · ")}</span>`;
  }
}

registerCard({
  type: "rohlik-delivery-card",
  documentationURL: "https://github.com/dvejsada/rohlik-cz-HA-cards/blob/main/docs/cards/delivery-card.md",
  getEntitySuggestion: suggestForKeys("rohlik-delivery-card", [
    "is_ordered", "delivery_time", "delivery_status", "delivery_time_remaining",
    "stops_before", "courier_distance", "courier_at_door", "last_mile", "next_order_since",
    "next_order_till", "delivery_info", "last_order", "delivery_calendar",
  ]),
  name: "Rohlík.cz Next Delivery",
  description: "Shows the state of your next Rohlík.cz order: ordered, on its way, or delivered.",
  preview: true,
});
