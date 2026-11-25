import { describe, expect, it } from "vitest";
import {
  arrivingHeadline,
  computeDeliveryState,
  liveCountdownMinutes,
  type DeliveryStateInput,
} from "../src/cards/delivery-card/state";
import { formatMinutes } from "../src/core/format";
import { suggestForKeys } from "../src/core/register";
import type { HomeAssistant } from "../src/core/types";

const NOW = new Date("2026-09-13T15:42:00Z");

function input(overrides: Partial<DeliveryStateInput> = {}): DeliveryStateInput {
  return {
    isOrdered: true,
    since: new Date("2026-09-13T15:00:00Z"),
    till: new Date("2026-09-13T17:00:00Z"),
    eta: new Date("2026-09-13T15:58:00Z"),
    announcementUpdatedAt: null,
    lastOrderAt: null,
    isReserved: false,
    isExpressAvailable: false,
    tracking: {
      status: "on_the_way",
      statusSince: null,
      orderId: null,
      stopsBefore: 2,
      distanceM: null,
      minutesLeft: 16,
      etaSource: "tracking",
      courierAtDoor: false,
      lastMile: false,
    },
    ...overrides,
  };
}

describe("liveCountdownMinutes", () => {
  const at = (iso: string) => new Date(iso);

  it("counts down locally from the ETA while arriving within 90 minutes", () => {
    const view = computeDeliveryState(input(), NOW);
    expect(liveCountdownMinutes(view, NOW)).toBe(16);
    // Keeps moving without HA updates, rounding up like the integration.
    expect(liveCountdownMinutes(view, at("2026-09-13T15:50:30Z"))).toBe(8);
    expect(liveCountdownMinutes(view, at("2026-09-13T15:57:30Z"))).toBe(1);
  });

  it("ignores the sensor's value, so a changed display unit can't skew it", () => {
    const hours = input();
    hours.tracking!.minutesLeft = 0.25;
    expect(liveCountdownMinutes(computeDeliveryState(hours, NOW), NOW)).toBe(16);
  });

  it("gives way to the clock time once the ETA has passed (late courier)", () => {
    const view = computeDeliveryState(input(), NOW);
    expect(liveCountdownMinutes(view, at("2026-09-13T15:58:00Z"))).toBeNull();
    expect(liveCountdownMinutes(view, at("2026-09-13T16:30:00Z"))).toBeNull();
  });

  it("is null far from the ETA, without an estimate, or before the window", () => {
    expect(liveCountdownMinutes(computeDeliveryState(input({ eta: at("2026-09-13T17:30:00Z") }), NOW), NOW)).toBeNull();
    expect(liveCountdownMinutes(computeDeliveryState(input({ eta: null }), NOW), NOW)).toBeNull();
    const queued = input({ since: new Date("2026-09-13T18:00:00Z") });
    queued.tracking!.status = "in_queue";
    expect(liveCountdownMinutes(computeDeliveryState(queued, NOW), NOW)).toBeNull();
  });

  it("is null without the integration's remaining-time sensor (older versions)", () => {
    expect(liveCountdownMinutes(computeDeliveryState(input({ tracking: null }), NOW), NOW)).toBeNull();
  });
});

describe("formatMinutes", () => {
  const en = { locale: { language: "en" } } as unknown as HomeAssistant;
  const cs = { locale: { language: "cs" } } as unknown as HomeAssistant;
  it("formats minutes and hours, optionally relative", () => {
    expect(formatMinutes(en, 12)).toBe("12 min");
    expect(formatMinutes(en, 80)).toBe("1 hr 20 min");
    expect(formatMinutes(en, 12, true)).toBe("in 12 min");
    expect(formatMinutes(cs, 12, true)).toBe("za 12 min");
  });
});

describe("suggestForKeys", () => {
  const hass = {
    entities: {
      "sensor.x_delivery_status": { entity_id: "sensor.x_delivery_status", platform: "rohlikcz", device_id: "dev1", translation_key: "delivery_status" },
      "sensor.x_cart_total": { entity_id: "sensor.x_cart_total", platform: "rohlikcz", device_id: "dev1", translation_key: "cart_price" },
      "sensor.other": { entity_id: "sensor.other", platform: "met", device_id: "dev2", translation_key: "delivery_status" },
    },
  } as unknown as HomeAssistant;
  const suggest = suggestForKeys("rohlik-delivery-card", ["delivery_status"]);

  it("suggests the card with the entity's device for its own keys", () => {
    expect(suggest(hass, "sensor.x_delivery_status")).toEqual({
      config: { type: "custom:rohlik-delivery-card", device: "dev1" },
    });
  });

  it("returns null for other keys, other platforms and unknown entities", () => {
    expect(suggest(hass, "sensor.x_cart_total")).toBeNull();
    expect(suggest(hass, "sensor.other")).toBeNull();
    expect(suggest(hass, "sensor.missing")).toBeNull();
  });
});

describe("arrivingHeadline", () => {
  const view = (overrides: Partial<DeliveryStateInput> = {}) => computeDeliveryState(input(overrides), NOW);

  it("counts down when live, else shows the estimated clock time", () => {
    expect(arrivingHeadline(view(), NOW)).toEqual({ kind: "countdown", minutes: 16 });
    expect(arrivingHeadline(view(), NOW, false)).toEqual({ kind: "eta", at: new Date("2026-09-13T15:58:00Z") });
  });

  it("says now at the door only when live (not compact / show_countdown off)", () => {
    const atDoor = input();
    atDoor.tracking!.courierAtDoor = true;
    const v = computeDeliveryState(atDoor, NOW);
    expect(arrivingHeadline(v, NOW)).toEqual({ kind: "now" });
    expect(arrivingHeadline(v, NOW, false).kind).toBe("eta");
  });

  it("shows the overdue clock time for a late courier", () => {
    expect(arrivingHeadline(view(), new Date("2026-09-13T16:30:00Z")).kind).toBe("eta");
  });

  it("falls back to 'by' the window end without an estimate, and none without a window", () => {
    expect(arrivingHeadline(view({ eta: null }), NOW)).toEqual({ kind: "by", at: new Date("2026-09-13T17:00:00Z") });
    expect(arrivingHeadline(view({ eta: null, till: null }), NOW)).toEqual({ kind: "none" });
  });
});

describe("last mile without live tracking", () => {
  it("keeps last_mile when the courier status is unknown (announcement ETA)", () => {
    const noStatus = input();
    noStatus.tracking!.status = null;
    noStatus.tracking!.lastMile = true;
    noStatus.tracking!.etaSource = "announcement";
    const v = computeDeliveryState(noStatus, NOW);
    expect(v.tracking.lastMile).toBe(true);
    expect(v.tracking.phase).toBeNull();
  });
});
