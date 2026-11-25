import { LitElement, css, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import type { HassEntity, HomeAssistant, LovelaceCardConfig } from "../../core/types";
import { findRohlikDevices, resolveEntities } from "../../core/discovery";
import { openMoreInfo } from "../../core/actions";
import { formatMinutes, formatRelativeDay, formatTime } from "../../core/format";
import { coreStrings, localize, withLanguage, type CardLanguage } from "../../core/localize";
import { registerBadge } from "../../core/register";
import { computeDeliveryState, liveCountdownMinutes, type DeliveryStateInput, type DeliveryView } from "../../cards/delivery-card/state";
import { readDeliveryInput } from "../../cards/delivery-card/input";
import { strings } from "./strings";
import "./editor";

export interface DeliveryBadgeConfig extends LovelaceCardConfig {
  type: "custom:rohlik-delivery-badge";
  device: string;
  name?: string;
  accent?: string;
  show_name?: boolean;
  /** Badge language; unset or `auto` follows the Home Assistant UI language. */
  language?: CardLanguage | "auto";
}

/**
 * Compact badge counterpart of `rohlik-delivery-card`: same
 * `computeDeliveryState` machine, rendered as a small HA-style pill. Does
 * not extend `RohlikBaseCard` (badges have a much smaller lifecycle than
 * cards) but reuses every other core helper.
 */
@customElement("rohlik-delivery-badge")
export class RohlikDeliveryBadge extends LitElement {
  static styles = css`
    :host {
      --rohlik-accent: var(--primary-color);
      display: inline-flex;
      max-width: 100%;
    }

    .badge {
      display: flex;
      align-items: center;
      gap: 8px;
      height: var(--ha-badge-size, 36px);
      min-width: var(--ha-badge-size, 36px);
      padding: 0 12px 0 6px;
      box-sizing: border-box;
      border-radius: var(--ha-badge-border-radius, calc(var(--ha-badge-size, 36px) / 2));
      border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--divider-color));
      box-shadow: var(--ha-card-box-shadow, none);
      backdrop-filter: var(--ha-card-backdrop-filter, none);
      background: var(--ha-card-background, var(--card-background-color));
      cursor: pointer;
      max-width: 100%;
    }

    .badge:focus-visible {
      outline: 2px solid var(--rohlik-accent);
      outline-offset: 2px;
    }

    .icon-circle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: var(--ha-border-radius-circle, 50%);
      flex-shrink: 0;
      background: color-mix(in srgb, var(--rohlik-icon-color, var(--rohlik-accent)) 15%, transparent);
    }

    ha-icon {
      color: var(--rohlik-icon-color, var(--rohlik-accent));
      --mdc-icon-size: var(--ha-badge-icon-size, 18px);
    }

    .text {
      display: flex;
      flex: 1;
      min-width: 0;
      flex-direction: column;
      overflow: hidden;
      line-height: 1.2;
    }

    .label {
      color: var(--secondary-text-color);
      font-size: var(--ha-font-size-xs, 10px);
      text-transform: uppercase;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .value {
      color: var(--primary-text-color);
      font-size: var(--ha-badge-font-size, var(--ha-font-size-s, 12px));
      font-weight: var(--ha-font-weight-medium, 500);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `;

  private _hass!: HomeAssistant;

  private _localeHass?: HomeAssistant;

  /**
   * `hass` as seen by the badge. When `config.language` is set to `cs`/`en`
   * this is a shallow copy whose locale speaks that language, so every
   * formatter and `t()` call follows the option without extra plumbing —
   * same pattern as `RohlikBaseCard` (the badge doesn't extend it, since
   * badges have a much smaller lifecycle than cards).
   */
  @property({ attribute: false })
  public get hass(): HomeAssistant {
    return this._localeHass ?? this._hass;
  }

  public set hass(value: HomeAssistant) {
    const old = this.hass;
    this._hass = value;
    this._localeHass = this.applyLanguage(value);
    this.requestUpdate("hass", old);
  }

  private applyLanguage(hass: HomeAssistant | undefined): HomeAssistant | undefined {
    if (!hass || !this.config?.language || this.config.language === "auto") return undefined;
    const localized = withLanguage(hass, this.config.language);
    return localized === hass ? undefined : localized;
  }

  @state() private config!: DeliveryBadgeConfig;

  @state() private entities: Map<string, string> = new Map();

  public setConfig(config: DeliveryBadgeConfig): void {
    if (!config?.device) {
      throw new Error(
        "Rohlík badge: 'device' is required — pick the Rohlík.cz device in the badge editor.",
      );
    }
    this.config = config;
    this._localeHass = this.applyLanguage(this._hass);
    if (this.hass) {
      this.entities = resolveEntities(this.hass, this.config.device);
    }
  }

  protected willUpdate(changed: PropertyValues<this>): void {
    if (changed.has("hass") && this.hass && this.config) {
      this.entities = resolveEntities(this.hass, this.config.device);
    }
  }

  private tickTimer: ReturnType<typeof setInterval> | undefined;

  public connectedCallback(): void {
    super.connectedCallback();
    // The countdown and "ordered in N" values move on their own; re-render
    // like the card does, so they don't freeze between HA updates.
    this.tickTimer = setInterval(() => this.requestUpdate(), 30_000);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.tickTimer !== undefined) {
      clearInterval(this.tickTimer);
      this.tickTimer = undefined;
    }
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement("rohlik-delivery-badge-editor");
  }

  public static getStubConfig(hass: HomeAssistant): Partial<DeliveryBadgeConfig> {
    const devices = findRohlikDevices(hass);
    return { device: devices[0]?.id ?? "" };
  }

  private entityId(key: string): string | undefined {
    return this.entities.get(key);
  }

  private entityState(key: string): HassEntity | undefined {
    const entityId = this.entityId(key);
    return entityId ? this.hass?.states?.[entityId] : undefined;
  }

  private t(key: string, vars?: Record<string, string | number>): string {
    // Merge per language: a shallow spread would drop coreStrings' cs/en
    // entries ("today", "tomorrow", …) under the card dictionary's.
    const merged: Record<string, Record<string, string>> = {};
    for (const lng of new Set([...Object.keys(coreStrings), ...Object.keys(strings)])) {
      merged[lng] = { ...coreStrings[lng], ...strings[lng] };
    }
    return localize(this.hass, merged, key, vars);
  }

  private deviceName(): string {
    if (this.config?.name) return this.config.name;
    const device = this.hass?.devices?.[this.config?.device];
    return device?.name_by_user || device?.name || "Rohlík.cz";
  }

  private buildInput(): DeliveryStateInput {
    return readDeliveryInput((key) => this.entityState(key), this.config.device);
  }

  private onClick = (): void => {
    const entityId = this.entityId("is_ordered");
    if (entityId) openMoreInfo(this, entityId);
  };

  private onKeydown = (ev: KeyboardEvent): void => {
    if (ev.key !== "Enter" && ev.key !== " ") return;
    ev.preventDefault();
    this.onClick();
  };

  protected render(): TemplateResult | typeof nothing {
    if (!this.config || !this.hass || !this.entityId("is_ordered")) return nothing;

    const view = computeDeliveryState(this.buildInput(), new Date());
    const phase = view.state === "delivered" ? null : view.tracking.phase;
    const warn = (view.state === "none" && view.isExpressAvailable) || phase === "at_door";
    const hostStyle = {
      ...(this.config.accent ? { "--rohlik-accent": this.config.accent } : {}),
      ...(warn ? { "--rohlik-icon-color": "var(--warning-color)" } : {}),
    };
    const stateLabel = phase ? this.t(`phase_${phase}`) : this.t(`chip_${view.state}`);
    const label = this.config.show_name ? `${this.deviceName()} · ${stateLabel}` : stateLabel;
    const icon =
      view.state === "delivered" ? "mdi:check" : phase === "at_door" ? "mdi:door-open" : "mdi:truck-delivery";

    return html`
      <div
        class="badge"
        style=${styleMap(hostStyle)}
        @click=${this.onClick}
        @keydown=${this.onKeydown}
        role="button"
        tabindex="0"
      >
        <div class="icon-circle">
          <ha-icon icon=${icon}></ha-icon>
        </div>
        <div class="text">
          <span class="label">${label}</span>
          <span class="value">${this.value(view)}</span>
        </div>
      </div>
    `;
  }

  private value(view: DeliveryView): string {
    switch (view.state) {
      case "arriving": {
        const { phase, stopsBefore } = view.tracking;
        if (phase === "at_door") return this.t("now");
        const minutes = liveCountdownMinutes(view, new Date());
        // Without an estimate, the window end is a deadline, not an ETA.
        const time = minutes != null
          ? formatMinutes(this.hass, minutes, true)
          : view.eta
          ? formatTime(this.hass, view.eta)
          : view.till
            ? `${this.t("by")} ${formatTime(this.hass, view.till)}`
            : "—";
        if (stopsBefore == null) return time;
        const stops = stopsBefore === 0 ? this.t("you_are_next") : this.t("stops_short", { count: stopsBefore });
        return `${time} · ${stops}`;
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
}

registerBadge({
  type: "rohlik-delivery-badge",
  documentationURL: "https://github.com/dvejsada/rohlik-cz-HA-cards/blob/main/docs/cards/delivery-card.md#badge--rohlik-delivery-badge",
  name: "Rohlík.cz Delivery Badge",
  description: "Compact status pill for your next Rohlík.cz delivery.",
  preview: true,
});
