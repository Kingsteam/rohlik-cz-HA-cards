import { describe, expect, it } from "vitest";
import { currencyFromUnit, shopFromManufacturer } from "../src/core/shop";

describe("shopFromManufacturer", () => {
  it("maps every rohlik-api Site.name", () => {
    expect(shopFromManufacturer("Rohlík.cz").code).toBe("cz");
    expect(shopFromManufacturer("Knuspr.de").currency).toBe("EUR");
    expect(shopFromManufacturer("Gurkerl.at").code).toBe("at");
    expect(shopFromManufacturer("Kifli.hu").currency).toBe("HUF");
    expect(shopFromManufacturer("Sezamo.ro").currency).toBe("RON");
  });

  it("tolerates loose spellings and falls back to Rohlík.cz", () => {
    expect(shopFromManufacturer("Rohlik.cz").code).toBe("cz");
    expect(shopFromManufacturer("KNUSPR").code).toBe("de");
    expect(shopFromManufacturer(undefined).code).toBe("cz");
    expect(shopFromManufacturer("Something else").code).toBe("cz");
  });
});

describe("currencyFromUnit", () => {
  it("normalises the units HA-RohlikCZ emits", () => {
    expect(currencyFromUnit("Kč")).toBe("CZK");
    expect(currencyFromUnit("CZK")).toBe("CZK");
    expect(currencyFromUnit("EUR")).toBe("EUR");
    expect(currencyFromUnit("€")).toBe("EUR");
    expect(currencyFromUnit(undefined)).toBeNull();
    expect(currencyFromUnit("items")).toBeNull();
  });
});
