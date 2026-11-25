import { describe, expect, it } from "vitest";
import {
  ACTIVE_STALE_MS,
  clearMemory,
  loadRecentDelivery,
  pinnedDeliveredAt,
  recordDeliveredAt,
  rememberActiveOrder,
  resolveDelivery,
  type StorageLike,
} from "../src/cards/delivery-card/memory";

/** In-memory `StorageLike` stub — a plain `Map`, no real `localStorage` involved. */
function makeStorage(): StorageLike {
  const map = new Map<string, string>();
  return {
    getItem: (key) => map.get(key) ?? null,
    setItem: (key, value) => {
      map.set(key, value);
    },
    removeItem: (key) => {
      map.delete(key);
    },
  };
}

const DEVICE = "dev1";
const TILL = new Date("2026-09-13T19:00:00Z");
const NOW = new Date("2026-09-13T19:05:00Z");

describe("loadRecentDelivery", () => {
  it("returns null when nothing is stored", () => {
    expect(loadRecentDelivery(makeStorage(), DEVICE)).toBeNull();
  });

  it("returns null for an order that's still active (no end time recorded yet)", () => {
    const storage = makeStorage();
    rememberActiveOrder(storage, DEVICE, { orderId: 1, till: TILL });
    expect(loadRecentDelivery(storage, DEVICE)).toBeNull();
  });

  it("returns the memory once it has been resolved", () => {
    const storage = makeStorage();
    rememberActiveOrder(storage, DEVICE, { orderId: 1, till: TILL }, NOW);
    resolveDelivery(storage, DEVICE, NOW);
    const memory = loadRecentDelivery(storage, DEVICE);
    expect(memory).not.toBeNull();
    expect(memory?.orderId).toBe(1);
    expect(memory?.till?.getTime()).toBe(TILL.getTime());
    expect(memory?.endedAt.getTime()).toBe(NOW.getTime());
  });

  it("is scoped per device", () => {
    const storage = makeStorage();
    rememberActiveOrder(storage, "dev1", { orderId: 1, till: null }, NOW);
    resolveDelivery(storage, "dev1", NOW);
    expect(loadRecentDelivery(storage, "dev2")).toBeNull();
  });

  it("returns null and doesn't throw on corrupt JSON", () => {
    const storage = makeStorage();
    storage.setItem("rohlik-delivery-last:dev1", "{not json");
    expect(loadRecentDelivery(storage, "dev1")).toBeNull();
  });

  it("returns null and doesn't throw when storage.getItem throws", () => {
    const storage: StorageLike = {
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => {},
      removeItem: () => {},
    };
    expect(loadRecentDelivery(storage, DEVICE)).toBeNull();
  });
});

describe("resolveDelivery", () => {
  it("returns null when nothing is stored", () => {
    expect(resolveDelivery(makeStorage(), DEVICE, NOW)).toBeNull();
  });

  it("stamps an active order with `now` and persists it", () => {
    const storage = makeStorage();
    rememberActiveOrder(storage, DEVICE, { orderId: 42, till: TILL }, NOW);
    const memory = resolveDelivery(storage, DEVICE, NOW);
    expect(memory?.orderId).toBe(42);
    expect(memory?.endedAt.getTime()).toBe(NOW.getTime());
    // Persisted, not just returned in-memory.
    expect(loadRecentDelivery(storage, DEVICE)?.endedAt.getTime()).toBe(NOW.getTime());
  });

  it("stamps `now` only once — a later call doesn't move endedAt", () => {
    const storage = makeStorage();
    rememberActiveOrder(storage, DEVICE, { orderId: 1, till: null }, NOW);
    const first = resolveDelivery(storage, DEVICE, NOW);
    const muchLater = new Date(NOW.getTime() + 60 * 60 * 1000);
    const second = resolveDelivery(storage, DEVICE, muchLater);
    expect(second?.endedAt.getTime()).toBe(first?.endedAt.getTime());
  });

  it("resolves an order left active by a previous session (reload right at delivery)", () => {
    // Simulates: page closed while `is_ordered` was still on, shortly
    // before delivery (so only the active-order marker got persisted, no
    // endedAt yet, `seenAt` recent); a fresh session loads storage and is
    // the first to observe `is_ordered` off.
    const storage = makeStorage();
    const seenAt = new Date(NOW.getTime() - 5 * 60 * 1000);
    rememberActiveOrder(storage, DEVICE, { orderId: 7, till: TILL }, seenAt);
    const memory = resolveDelivery(storage, DEVICE, NOW);
    expect(memory?.orderId).toBe(7);
    expect(memory?.till?.getTime()).toBe(TILL.getTime());
    expect(memory?.endedAt.getTime()).toBe(NOW.getTime());
  });

  it("clears a stale active record (unseen for longer than ACTIVE_STALE_MS) and returns null", () => {
    // Simulates: the app was closed while `is_ordered` was on and never
    // reopened until long after the real delivery — only the active
    // marker is on disk, stamped with a `seenAt` far in the past.
    const storage = makeStorage();
    const seenAt = new Date(NOW.getTime() - ACTIVE_STALE_MS - 60_000);
    rememberActiveOrder(storage, DEVICE, { orderId: 9, till: TILL }, seenAt);
    expect(resolveDelivery(storage, DEVICE, NOW)).toBeNull();
    expect(loadRecentDelivery(storage, DEVICE)).toBeNull();
  });

  it("clears a stale active record whose delivery window closed long ago, even if seenAt is recent", () => {
    const storage = makeStorage();
    const longAgoTill = new Date(NOW.getTime() - ACTIVE_STALE_MS - 60_000);
    rememberActiveOrder(storage, DEVICE, { orderId: 9, till: longAgoTill }, NOW);
    expect(resolveDelivery(storage, DEVICE, NOW)).toBeNull();
    expect(loadRecentDelivery(storage, DEVICE)).toBeNull();
  });

  it("resolves a fresh active record normally (not stale)", () => {
    const storage = makeStorage();
    rememberActiveOrder(storage, DEVICE, { orderId: 10, till: TILL }, NOW);
    const soon = new Date(NOW.getTime() + 60_000);
    const memory = resolveDelivery(storage, DEVICE, soon);
    expect(memory?.orderId).toBe(10);
    expect(memory?.endedAt.getTime()).toBe(soon.getTime());
  });

  it("treats a record with no seenAt (pre-fix storage shape) as stale", () => {
    const storage = makeStorage();
    storage.setItem(
      "rohlik-delivery-last:dev1",
      JSON.stringify({ orderId: 11, till: TILL.toISOString(), endedAt: null }),
    );
    expect(resolveDelivery(storage, DEVICE, NOW)).toBeNull();
    expect(loadRecentDelivery(storage, DEVICE)).toBeNull();
  });
});

describe("rememberActiveOrder", () => {
  it("overwrites a previously resolved memory, clearing it back to 'active'", () => {
    const storage = makeStorage();
    rememberActiveOrder(storage, DEVICE, { orderId: 1, till: TILL }, NOW);
    resolveDelivery(storage, DEVICE, NOW);
    expect(loadRecentDelivery(storage, DEVICE)).not.toBeNull();

    // A new order starts.
    rememberActiveOrder(storage, DEVICE, { orderId: 2, till: null });
    expect(loadRecentDelivery(storage, DEVICE)).toBeNull();
  });

  it("silently no-ops when storage.setItem throws", () => {
    const storage: StorageLike = {
      getItem: () => null,
      setItem: () => {
        throw new Error("quota exceeded");
      },
      removeItem: () => {},
    };
    expect(() => rememberActiveOrder(storage, DEVICE, { orderId: 1, till: null })).not.toThrow();
  });
});

describe("clearMemory", () => {
  it("removes a stored memory", () => {
    const storage = makeStorage();
    rememberActiveOrder(storage, DEVICE, { orderId: 1, till: null }, NOW);
    resolveDelivery(storage, DEVICE, NOW);
    clearMemory(storage, DEVICE);
    expect(loadRecentDelivery(storage, DEVICE)).toBeNull();
  });

  it("is a no-op when nothing is stored", () => {
    expect(() => clearMemory(makeStorage(), DEVICE)).not.toThrow();
  });

  it("silently no-ops when storage.removeItem throws", () => {
    const storage: StorageLike = {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {
        throw new Error("blocked");
      },
    };
    expect(() => clearMemory(storage, DEVICE)).not.toThrow();
  });
});

describe("recordDeliveredAt", () => {
  const DEVICE = "dev1";
  const TILL = new Date("2026-09-13T17:00:00Z");
  const DELIVERED = new Date("2026-09-13T15:42:00Z");

  it("pins the remembered time to the tracked delivery moment, and keeps it after resolving", () => {
    const storage = makeStorage();
    rememberActiveOrder(storage, DEVICE, { orderId: 7, till: TILL }, DELIVERED);
    recordDeliveredAt(storage, DEVICE, 7, DELIVERED);
    const memory = resolveDelivery(storage, DEVICE, new Date("2026-09-13T15:50:00Z"));
    expect(memory?.till).toEqual(DELIVERED);
    expect(loadRecentDelivery(storage, DEVICE)?.till).toEqual(DELIVERED);
  });

  it("leaves another order's record alone", () => {
    const storage = makeStorage();
    rememberActiveOrder(storage, DEVICE, { orderId: 8, till: TILL }, DELIVERED);
    recordDeliveredAt(storage, DEVICE, 7, DELIVERED);
    const memory = resolveDelivery(storage, DEVICE, new Date("2026-09-13T15:50:00Z"));
    expect(memory?.till).toEqual(TILL);
  });

  it("writes a resolved record on a browser that never saw the order active", () => {
    const storage = makeStorage();
    recordDeliveredAt(storage, DEVICE, 7, DELIVERED);
    const memory = loadRecentDelivery(storage, DEVICE);
    expect(memory).toMatchObject({ orderId: 7, till: DELIVERED, endedAt: DELIVERED });
  });

  it("only moves the pinned time earlier (last_changed is re-stamped on reload)", () => {
    const storage = makeStorage();
    recordDeliveredAt(storage, DEVICE, 7, DELIVERED);
    recordDeliveredAt(storage, DEVICE, 7, new Date("2026-09-13T15:55:00Z"));
    expect(loadRecentDelivery(storage, DEVICE)?.till).toEqual(DELIVERED);
  });

  it("survives rememberActiveOrder rewriting the record every render", () => {
    const storage = makeStorage();
    rememberActiveOrder(storage, DEVICE, { orderId: 7, till: TILL }, DELIVERED);
    recordDeliveredAt(storage, DEVICE, 7, DELIVERED);
    rememberActiveOrder(storage, DEVICE, { orderId: 7, till: TILL }, DELIVERED);
    const memory = resolveDelivery(storage, DEVICE, new Date("2026-09-13T15:50:00Z"));
    expect(memory?.till).toEqual(DELIVERED);
  });

  it("replaces a finished older order but not an active one", () => {
    const storage = makeStorage();
    recordDeliveredAt(storage, DEVICE, 6, new Date("2026-09-12T10:00:00Z"));
    recordDeliveredAt(storage, DEVICE, 7, DELIVERED);
    expect(loadRecentDelivery(storage, DEVICE)?.orderId).toBe(7);
  });

  it("exposes the pinned moment for the same order only", () => {
    const storage = makeStorage();
    recordDeliveredAt(storage, DEVICE, 7, DELIVERED);
    expect(pinnedDeliveredAt(storage, DEVICE, 7)).toEqual(DELIVERED);
    expect(pinnedDeliveredAt(storage, DEVICE, 8)).toBeNull();
  });
});
