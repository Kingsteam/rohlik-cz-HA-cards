import { describe, expect, it } from "vitest";
import { formatDistance } from "../src/core/format";
import { distanceInMetres } from "../src/cards/delivery-card/input";
import type { HassEntity, HomeAssistant } from "../src/core/types";

const hass = { locale: { language: "en" } } as unknown as HomeAssistant;
const entity = (state: string, unit?: string) =>
  ({ state, attributes: unit ? { unit_of_measurement: unit } : {} }) as unknown as HassEntity;

describe("formatDistance", () => {
  it("rounds before picking the unit", () => {
    expect(formatDistance(hass, 997)).toBe("1 km");
    expect(formatDistance(hass, 344)).toBe("340 m");
    expect(formatDistance(hass, 1420)).toBe("1.4 km");
  });
});

describe("distanceInMetres", () => {
  it("converts the state's unit", () => {
    expect(distanceInMetres(entity("1.42", "km"))).toBeCloseTo(1420);
    expect(distanceInMetres(entity("0.8", "nmi"))).toBeCloseTo(1481.6);
    expect(distanceInMetres(entity("350"))).toBe(350);
  });

  it("returns null for unknown units and states", () => {
    expect(distanceInMetres(entity("3", "parsec"))).toBeNull();
    expect(distanceInMetres(entity("unknown", "km"))).toBeNull();
  });
});
