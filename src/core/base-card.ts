import {
  LitElement,
  html,
  nothing,
  type TemplateResult,
  type CSSResultGroup,
  type PropertyValues,
} from "lit";
import { property, state } from "lit/decorators.js";
import type {
  HomeAssistant,
  HassEntity,
  LovelaceCard,
  LovelaceCardConfig,
  LovelaceGridOptions,
} from "./types";
import { findRohlikDevices, resolveEntities } from "./discovery";
import { formatAgo, formatMoney, parseTs } from "./format";
import { currencyFromUnit, shopForDevice, type ShopInfo } from "./shop";
import { localize, coreStrings, withLanguage, type CardLanguage, type Dict } from "./localize";
import { sharedStyles } from "./styles";
import { isFixedHeight } from "./layout";

export interface RohlikCardConfig extends LovelaceCardConfig {
  device: string;
  name?: string;
  accent?: string;
  /** Card language; unset or `auto` follows the Home Assistant UI language. */
  language?: CardLanguage | "auto";
}

const STALE_AFTER_MINUTES = 20;

/** Sensors whose unit is the account's currency, in lookup order. */
const MONEY_SENSORS = ["cart_price", "credit_amount", "monthly_spent", "yearly_spent", "alltime_spent"];

/**
 * Shared behaviour for every Rohlík card: config validation, device/entity
 * resolution, small state-reading helpers, the "updated N min ago" freshness
 * footer, and localization bound to the subclass's own string dictionary.
 */
export abstract class RohlikBaseCard<C extends RohlikCardConfig = RohlikCardConfig>
  extends LitElement
  implements LovelaceCard
{
  static styles: CSSResultGroup = sharedStyles;

  /** Per-card string dictionary, merged with `coreStrings` at lookup time. */
  protected abstract readonly strings: Dict;

  private _hass!: HomeAssistant;

  private _localeHass?: HomeAssistant;

  /**
   * The `hass` object as seen by the card. When the `language` option is set
   * it is a shallow copy whose locale speaks that language, so every
   * formatter and `t()` call follows the option without extra plumbing.
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

  /** The unmodified `hass` (use for `callWS`/`callService` identity-sensitive code, if ever needed). */
  protected get rawHass(): HomeAssistant {
    return this._hass;
  }

  private applyLanguage(hass: HomeAssistant | undefined): HomeAssistant | undefined {
    if (!hass || !this.config?.language || this.config.language === "auto") return undefined;
    const localized = withLanguage(hass, this.config.language);
    return localized === hass ? undefined : localized;
  }

  /**
   * Set by HA's `hui-card`: `"grid"` in a sections view, `"panel"` in a panel
   * view, `"masonry"` (or unset) elsewhere. Used to tell a user-chosen fixed
   * height apart from the default content-sized one.
   */
  @property({ attribute: false }) public layout?: string;

  @state() protected config!: C;

  @state() protected entities: Map<string, string> = new Map();

  setConfig(config: C): void {
    if (!config?.device) {
      throw new Error(
        "Rohlík card: 'device' is required — pick the Rohlík.cz device in the card editor.",
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

  /**
   * Height in 50 px units, for masonry column balancing and the editor's
   * starting size when the user switches "auto height" off. The rendered
   * height when known, else the card's estimate.
   */
  getCardSize(): number {
    const height = this.isConnected ? this.offsetHeight : 0;
    return height > 0 ? Math.max(1, Math.ceil(height / 50)) : this.estimatedCardSize();
  }

  /** Typical rendered height in 50 px units, used before the card has rendered. */
  protected estimatedCardSize(): number {
    return 4;
  }

  /**
   * Content-sized by default: the cards' height varies with state, data,
   * language and width, so a fixed row count either spills over the next
   * card or leaves an empty band (issue #13). Users can still pick a fixed
   * height in the editor; see `fixedHeight`.
   */
  getGridOptions(): LovelaceGridOptions {
    return { columns: 12, rows: "auto", min_columns: 6, min_rows: 2 };
  }

  /**
   * Whether the card sits in a cell of fixed height: a panel view, or a
   * sections view where the user picked a number of rows. Reflected as the
   * `fixed` host attribute, which lets the card scroll inside instead of
   * spilling over its neighbours.
   */
  protected get fixedHeight(): boolean {
    return isFixedHeight(this.layout, this.config?.grid_options);
  }

  protected updated(changed: PropertyValues<this>): void {
    super.updated(changed);
    this.toggleAttribute("fixed", this.fixedHeight);
  }

  static getStubConfig(hass: HomeAssistant): Partial<RohlikCardConfig> {
    const devices = findRohlikDevices(hass);
    return { device: devices[0]?.id ?? "" };
  }

  /** Resolves a `translation_key` to its `entity_id` on the configured device. */
  protected entityId(key: string): string | undefined {
    return this.entities.get(key);
  }

  /** Full `HassEntity` for a `translation_key`, if the entity exists and has state. */
  protected state(key: string): HassEntity | undefined {
    const entityId = this.entityId(key);
    return entityId ? this.hass?.states?.[entityId] : undefined;
  }

  protected attr(key: string, name: string): unknown {
    return this.state(key)?.attributes?.[name];
  }

  protected isOn(key: string): boolean {
    return this.state(key)?.state === "on";
  }

  protected deviceName(): string {
    if (this.config?.name) return this.config.name;
    const device = this.hass?.devices?.[this.config?.device];
    return device?.name_by_user || device?.name || "Rohlík.cz";
  }

  /** The account's shop (Rohlík.cz, Knuspr.de, …), from the device's manufacturer. */
  protected get shop(): ShopInfo {
    return shopForDevice(this.hass, this.config?.device);
  }

  /**
   * ISO currency of the account: the unit of the first money sensor that
   * has one (HA-RohlikCZ 1.1+ sets it per shop), else the shop's currency.
   */
  protected get currency(): string {
    for (const key of MONEY_SENSORS) {
      const currency = currencyFromUnit(this.attr(key, "unit_of_measurement"));
      if (currency) return currency;
    }
    return this.shop.currency;
  }

  /** Formats an amount in the account's currency. */
  protected money(amount: number, currency = this.currency): string {
    return formatMoney(this.hass, amount, currency);
  }

  /** Sets `--rohlik-accent` from `config.accent`, when given. */
  protected get accentStyle(): Record<string, string> {
    return this.config?.accent ? { "--rohlik-accent": this.config.accent } : {};
  }

  protected t(key: string, vars?: Record<string, string | number>): string {
    return localize(this.hass, { ...coreStrings, ...this.mergedStrings() }, key, vars);
  }

  private mergedStrings(): Dict {
    const merged: Dict = {};
    for (const lang of new Set([...Object.keys(coreStrings), ...Object.keys(this.strings)])) {
      merged[lang] = { ...coreStrings[lang], ...this.strings[lang] };
    }
    return merged;
  }

  /** "updated N min ago" footer line, amber once older than 20 minutes. */
  protected renderFreshness(updatedKey = "updated"): TemplateResult | typeof nothing {
    const date = parseTs(this.state(updatedKey)?.state);
    if (!date) return nothing;
    const staleMs = STALE_AFTER_MINUTES * 60 * 1000;
    const stale = Date.now() - date.getTime() > staleMs;
    return html`
      <div class="footer ${stale ? "stale" : ""}">
        ${this.t("updated_ago", { time: formatAgo(this.hass, date) })}
      </div>
    `;
  }

  protected renderError(message: string): TemplateResult {
    return html`<div class="error">${message}</div>`;
  }
}
