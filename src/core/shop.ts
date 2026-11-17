import type { HomeAssistant } from "./types";

/** A Rohlík Group shop, as far as the cards need to know it. */
export interface Shop {
  /** Shop name, as HA-RohlikCZ reports it as the device manufacturer. */
  name: string;
  /** Shop home page. */
  url: string;
  /**
   * Where the "Order" button points. Only Rohlík.cz's cart path (`/kosik`)
   * is known; the other shops open their home page, which shows the cart.
   */
  checkoutUrl: string;
  /** ISO 4217 currency of the shop's prices. */
  currency: string;
}

/** The shops HA-RohlikCZ supports, keyed by country code. */
export const SHOPS: Record<string, Shop> = {
  cz: {
    name: "Rohlík.cz",
    url: "https://www.rohlik.cz",
    checkoutUrl: "https://www.rohlik.cz/kosik",
    currency: "CZK",
  },
  de: { name: "Knuspr.de", url: "https://www.knuspr.de", checkoutUrl: "https://www.knuspr.de", currency: "EUR" },
  at: { name: "Gurkerl.at", url: "https://www.gurkerl.at", checkoutUrl: "https://www.gurkerl.at", currency: "EUR" },
  hu: { name: "Kifli.hu", url: "https://www.kifli.hu", checkoutUrl: "https://www.kifli.hu", currency: "HUF" },
  ro: { name: "Sezamo.ro", url: "https://www.sezamo.ro", checkoutUrl: "https://www.sezamo.ro", currency: "RON" },
};

/** Fallback for devices that report no (or an unknown) manufacturer. */
export const DEFAULT_SHOP: Shop = SHOPS.cz;

function normalise(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim()
    .toLowerCase();
}

/**
 * Maps a device manufacturer (HA-RohlikCZ ≥ 1.1 sets it to the shop name,
 * e.g. "Gurkerl.at") to its shop. Accent and case differences are ignored;
 * anything unknown is Rohlík.cz, which older integration versions imply.
 */
export function shopFromManufacturer(manufacturer?: string | null): Shop {
  if (!manufacturer) return DEFAULT_SHOP;
  const wanted = normalise(manufacturer);
  return Object.values(SHOPS).find((shop) => normalise(shop.name) === wanted) ?? DEFAULT_SHOP;
}

/** The shop of the configured Rohlík device. */
export function shopForDevice(hass: HomeAssistant | undefined, deviceId: string | undefined): Shop {
  const device = deviceId ? hass?.devices?.[deviceId] : undefined;
  return shopFromManufacturer(device?.manufacturer);
}
