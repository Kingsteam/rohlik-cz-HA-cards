import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { readDeliveryInput } from "../src/cards/delivery-card/input";
import { computeDeliveryState } from "../src/cards/delivery-card/state";
import type { HassEntity } from "../src/core/types";

const DEVICE = "dev1";

function entity(state: string, attributes: Record<string, unknown> = {}, lastChanged = "2026-09-13T15:00:00Z"): HassEntity {
  return { entity_id: "x", state, attributes, last_changed: lastChanged, last_updated: lastChanged };
}

describe("readDeliveryInput — pinned delivery for a still-listed order", () => {
  let store: Map<string, string>;

  beforeEach(() => {
    store = new Map();
    (globalThis as unknown as { window: unknown }).window = {
      localStorage: {
        getItem: (k: string) => store.get(k) ?? null,
        setItem: (k: string, v: string) => void store.set(k, v),
        removeItem: (k: string) => void store.delete(k),
      },
    };
  });

  afterEach(() => {
    delete (globalThis as unknown as { window?: unknown }).window;
  });

  it("stays delivered after the integration drops the delivered status", () => {
    const order = { id: 7, deliverySlot: { since: "2026-09-13T15:00:00Z", till: "2026-09-13T17:00:00Z" } };
    const base: Record<string, HassEntity> = {
      is_ordered: entity("on", { order_data: order }),
      next_order_since: entity("2026-09-13T15:00:00Z"),
      next_order_till: entity("2026-09-13T17:00:00Z"),
    };
    const deliveredAt = "2026-09-13T15:42:00Z";

    // While the status is live, the delivery moment gets pinned.
    const live: Record<string, HassEntity> = { ...base, delivery_status: entity("delivered", { order_id: 7 }, deliveredAt) };
    readDeliveryInput((k) => live[k], DEVICE);

    // 30+ minutes later the status is gone, but the order is still listed.
    const later: Record<string, HassEntity> = { ...base, delivery_status: entity("unknown") };
    const view = computeDeliveryState(readDeliveryInput((k) => later[k], DEVICE), new Date("2026-09-13T16:20:00Z"));
    expect(view.state).toBe("delivered");
    expect(view.deliveredAt).toEqual(new Date(deliveredAt));
  });

  it("does not mark a new listed order delivered from an older order's pin", () => {
    const deliveredAt = "2026-09-13T15:42:00Z";
    const first = {
      is_ordered: entity("on", { order_data: { id: 7 } }),
      delivery_status: entity("delivered", { order_id: 7 }, deliveredAt),
    };
    readDeliveryInput((k) => first[k as keyof typeof first], DEVICE);
    const next = {
      is_ordered: entity("on", { order_data: { id: 8 } }),
      next_order_since: entity("2026-09-14T08:00:00Z"),
      delivery_status: entity("unknown"),
    };
    const view = computeDeliveryState(
      readDeliveryInput((k) => next[k as keyof typeof next], DEVICE),
      new Date("2026-09-13T16:20:00Z"),
    );
    expect(view.state).toBe("ordered");
  });
});
