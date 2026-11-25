import type { HomeAssistant } from "./types";

/**
 * The Rohlík Group shop an account belongs to. HA-RohlikCZ (1.1+) supports
 * five shops and reports the shop's name as the device `manufacturer`
 * (rohlik-api's `Site.name`), so the cards derive the shop — and with it the
 * currency and the links — from the device, with no extra config.
 */
export interface ShopInfo {
  /** Shop code as rohlik-api names it: `cz`, `de`, `at`, `hu`, `ro`. */
  code: string;
  /** Display name, e.g. `Rohlík.cz`, `Knuspr.de`. */
  name: string;
  /** Shop home page. */
  url: string;
  /** Cart page; the home page where the cart path isn't known. */
  cartUrl: string;
  /** ISO 4217 currency code. */
  currency: string;
}

export const SHOPS: readonly ShopInfo[] = [
  { code: "cz", name: "Rohlík.cz", url: "https://www.rohlik.cz", cartUrl: "https://www.rohlik.cz/kosik", currency: "CZK" },
  { code: "de", name: "Knuspr.de", url: "https://www.knuspr.de", cartUrl: "https://www.knuspr.de", currency: "EUR" },
  { code: "at", name: "Gurkerl.at", url: "https://www.gurkerl.at", cartUrl: "https://www.gurkerl.at", currency: "EUR" },
  { code: "hu", name: "Kifli.hu", url: "https://www.kifli.hu", cartUrl: "https://www.kifli.hu", currency: "HUF" },
  { code: "ro", name: "Sezamo.ro", url: "https://www.sezamo.ro", cartUrl: "https://www.sezamo.ro", currency: "RON" },
];

export const DEFAULT_SHOP: ShopInfo = SHOPS[0];

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

/**
 * Matches a device `manufacturer` to a shop. Accepts the exact
 * `Site.name` as well as looser spellings ("Rohlik.cz", "knuspr").
 * Unknown or missing manufacturers (integration < 1.1 left it unset) fall
 * back to Rohlík.cz, which is what those versions always talked to.
 */
export function shopFromManufacturer(manufacturer: string | null | undefined): ShopInfo {
  if (!manufacturer) return DEFAULT_SHOP;
  const needle = normalize(manufacturer);
  for (const shop of SHOPS) {
    const name = normalize(shop.name);
    if (needle === name || needle.includes(name.split(".")[0])) return shop;
  }
  return DEFAULT_SHOP;
}

export function shopForDevice(hass: HomeAssistant | undefined, deviceId: string | undefined): ShopInfo {
  if (!hass || !deviceId) return DEFAULT_SHOP;
  return shopFromManufacturer(hass.devices?.[deviceId]?.manufacturer);
}

/**
 * Turns a money sensor's `unit_of_measurement` into an ISO currency code.
 * HA-RohlikCZ uses the ISO code (`CZK`, `EUR`, …), except on Czech-language
 * installs, which keep the historical `Kč`. Returns null for anything else.
 */
export function currencyFromUnit(unit: unknown): string | null {
  if (typeof unit !== "string") return null;
  const trimmed = unit.trim();
  if (trimmed === "Kč" || trimmed.toLowerCase() === "kc") return "CZK";
  if (trimmed === "€") return "EUR";
  if (trimmed === "Ft") return "HUF";
  if (trimmed.toLowerCase() === "lei") return "RON";
  if (/^[A-Z]{3}$/.test(trimmed)) return trimmed;
  return null;
}
