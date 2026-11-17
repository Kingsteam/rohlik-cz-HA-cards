import { describe, expect, it } from "vitest";
import { DEFAULT_SHOP, SHOPS, shopForDevice, shopFromManufacturer } from "../src/core/shop";
import { parseTodoItem, resolveCheckoutUrl, DEFAULT_CHECKOUT_URL } from "../src/cards/cart-card/parse";
import { parseOrderItems } from "../src/cards/delivery-card/state";
import { CARD_LANGUAGES, coreStrings, localize, withLanguage, type Dict } from "../src/core/localize";
import { formatAgo, formatMoney } from "../src/core/format";
import { strings as cartStrings, labels as cartLabels } from "../src/cards/cart-card/strings";
import { strings as deliveryStrings, labels as deliveryLabels } from "../src/cards/delivery-card/strings";
import { strings as slotsStrings, labels as slotsLabels } from "../src/cards/slots-card/strings";
import { strings as accountStrings, labels as accountLabels } from "../src/cards/account-card/strings";
import { strings as spendingStrings, labels as spendingLabels } from "../src/cards/spending-card/strings";
import { badgeLabels } from "../src/badges/delivery-badge/strings";
import { makeHass } from "./fixtures";

const IMG = "https://cdn.example.test/images/grocery/products/1/1-1.jpg";

describe("shop", () => {
  it.each([
    ["Rohlík.cz", "cz"],
    ["Rohlik.cz", "cz"],
    ["Knuspr.de", "de"],
    ["Gurkerl.at", "at"],
    ["gurkerl.at", "at"],
    ["Kifli.hu", "hu"],
    ["Sezamo.ro", "ro"],
  ])("maps manufacturer %s to %s", (manufacturer, code) => {
    expect(shopFromManufacturer(manufacturer)).toBe(SHOPS[code]);
  });

  it("falls back to Rohlík.cz for unknown or missing manufacturers", () => {
    expect(shopFromManufacturer(undefined)).toBe(DEFAULT_SHOP);
    expect(shopFromManufacturer(null)).toBe(DEFAULT_SHOP);
    expect(shopFromManufacturer("Someone else")).toBe(DEFAULT_SHOP);
    expect(DEFAULT_SHOP.checkoutUrl).toBe(DEFAULT_CHECKOUT_URL);
  });

  it("reads the shop off the configured device", () => {
    const hass = makeHass({
      devices: { dev1: { id: "dev1", name: "Konto", manufacturer: "Gurkerl.at" } as never },
    });
    expect(shopForDevice(hass, "dev1")).toBe(SHOPS.at);
    expect(shopForDevice(hass, "missing")).toBe(DEFAULT_SHOP);
    expect(shopForDevice(undefined, undefined)).toBe(DEFAULT_SHOP);
  });

  it("has well-formed entries", () => {
    for (const shop of Object.values(SHOPS)) {
      expect(shop.url).toMatch(/^https:\/\/www\./);
      expect(shop.checkoutUrl.startsWith(shop.url)).toBe(true);
      expect(shop.currency).toMatch(/^[A-Z]{3}$/);
    }
  });
});

describe("checkout URL", () => {
  it("prefers a configured URL, then the shop's", () => {
    expect(resolveCheckoutUrl(" https://x.test/cart ", SHOPS.at.checkoutUrl)).toBe("https://x.test/cart");
    expect(resolveCheckoutUrl("", SHOPS.at.checkoutUrl)).toBe("https://www.gurkerl.at");
    expect(resolveCheckoutUrl(undefined, SHOPS.at.checkoutUrl)).toBe("https://www.gurkerl.at");
  });

  it("keeps the Rohlík.cz default without a fallback", () => {
    expect(resolveCheckoutUrl(undefined)).toBe(DEFAULT_CHECKOUT_URL);
  });
});

describe("parseTodoItem — other currencies and images", () => {
  it.each([
    ["Testmilch 3,5 % (2) - 3.58 EUR", 3.58],
    ["Testmilch 3,5 % (2) - 3,58 €", 3.58],
    ["Testmilch 3,5 % (2) - 1290 Ft", 1290],
    ["Testmilch 3,5 % (2) - 12.5 lei", 12.5],
    ["Testmilch 3,5 % (2) - 21.9 CZK", 21.9],
    ["Testmilch 3,5 % (2) - 21.9", 21.9],
  ])("parses %s", (summary, price) => {
    const line = parseTodoItem({ uid: "1", summary });
    expect(line).toMatchObject({ name: "Testmilch 3,5 %", quantity: 2, price });
  });

  it("reads the picture from the Image description line", () => {
    const line = parseTodoItem({
      uid: "1",
      summary: "Testbrot (1) - 2.49 EUR",
      description: `Category: Brot\nBrand: Test\nProduct ID: 7\nImage: ${IMG}`,
    });
    expect(line?.image).toBe(IMG);
    expect(line?.productId).toBe(7);
  });

  it("ignores a non-http picture value", () => {
    const line = parseTodoItem({
      uid: "1",
      summary: "Testbrot (1) - 2.49 EUR",
      description: "Image: javascript:alert(1)",
    });
    expect(line?.image).toBeUndefined();
  });

  it("has no image when the line is missing", () => {
    const line = parseTodoItem({ uid: "1", summary: "Testbrot (1) - 2.49 EUR", description: "Brand: Test" });
    expect(line && "image" in line).toBe(false);
  });
});

describe("parseOrderItems", () => {
  it("maps the integration's items attribute", () => {
    expect(
      parseOrderItems([
        { id: 1, name: "Testbrot", quantity: 1, price: 2.5, textual_amount: "500 g", image: IMG },
        { id: 2, name: " Testmilch ", quantity: 2, textual_amount: "", image: null },
      ]),
    ).toEqual([
      { name: "Testbrot", quantity: 1, amount: "500 g", image: IMG },
      { name: "Testmilch", quantity: 2 },
    ]);
  });

  it("drops invalid entries and values", () => {
    expect(
      parseOrderItems([
        null,
        "junk",
        { quantity: 3 },
        { name: "", quantity: 1 },
        { name: "X", quantity: "abc", image: "data:image/png;base64,AAAA" },
        { name: "Y", quantity: 0 },
      ]),
    ).toEqual([
      { name: "X", quantity: 1 },
      { name: "Y", quantity: 1 },
    ]);
  });

  it.each([undefined, null, {}, "items"])("returns [] for %s", (raw) => {
    expect(parseOrderItems(raw)).toEqual([]);
  });
});

describe("German", () => {
  const de = makeHass({ locale: { language: "de" } as never });

  it("is a selectable card language", () => {
    expect(CARD_LANGUAGES).toContain("de");
    const hass = makeHass({ locale: { language: "en" } as never });
    expect(withLanguage(hass, "de").locale?.language).toBe("de");
  });

  it("translates core strings", () => {
    expect(localize(de, coreStrings, "refresh")).toBe("Aktualisieren");
    expect(localize(de, coreStrings, "items_count", { count: 3 })).toBe("3 Artikel");
  });

  it("puts the shop name into shop-specific texts", () => {
    expect(localize(de, cartStrings, "search_placeholder", { shop: "Gurkerl.at" })).toBe("Bei Gurkerl.at suchen…");
    expect(localize(de, deliveryStrings, "shop_link", { shop: "Gurkerl.at" })).toBe("Wieder bei Gurkerl.at bestellen");
    const en = makeHass({ locale: { language: "en" } as never });
    expect(localize(en, cartStrings, "order_hint", { shop: "Knuspr.de" })).toBe("Opens Knuspr.de in a new tab");
  });

  const dicts: [string, Dict][] = [
    ["core", coreStrings],
    ["cart", cartStrings],
    ["cart labels", cartLabels],
    ["delivery", deliveryStrings],
    ["delivery labels", deliveryLabels],
    ["slots", slotsStrings],
    ["slots labels", slotsLabels],
    ["account", accountStrings],
    ["account labels", accountLabels],
    ["spending", spendingStrings],
    ["spending labels", spendingLabels],
    ["badge labels", badgeLabels],
  ];

  it.each(dicts)("%s: de, cs and en have the same keys", (_name, dict) => {
    const en = Object.keys(dict.en).sort();
    expect(Object.keys(dict.de ?? {}).sort()).toEqual(en);
    expect(Object.keys(dict.cs).sort()).toEqual(en);
  });

  it("formats money in the shop currency and relative times in German", () => {
    expect(formatMoney(de, 2.5, "EUR")).toMatch(/2,50\s?€/);
    const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000);
    expect(formatAgo(de, fiveMinAgo).startsWith("vor ")).toBe(true);
  });
});
