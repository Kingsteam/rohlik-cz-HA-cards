/**
 * Cross-reload memory for "an order just got delivered".
 *
 * `is_ordered` has no "delivered" state of its own, and `last_order`'s
 * timestamp is the order's *placement* time, not its delivery time — so
 * neither entity can drive the card's "delivered" state on its own. Instead
 * we watch `is_ordered` flip from on to off ourselves and remember that
 * moment, persisted to `localStorage` (keyed per device) so it survives a
 * page reload that happens to land right after delivery.
 *
 * Pure functions with the storage injected (`StorageLike`), so they're
 * testable without a real `localStorage` — see `test/delivery-memory.test.ts`.
 */
import type { RecentDeliveryMemory } from "./state";

export type { RecentDeliveryMemory };

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

interface StoredMemory {
  orderId: string | number | null;
  till: string | null;
  /**
   * ISO of the last render that observed the order active (`endedAt` still
   * `null`). Used to tell a record that's genuinely still active from one
   * abandoned by a session that closed before ever seeing the order end —
   * see `ACTIVE_STALE_MS`.
   */
  seenAt: string | null;
  /** `null` while the order is still active (not yet resolved into a "delivered" memory). */
  endedAt: string | null;
  /**
   * The delivery moment reported by live tracking (HA-RohlikCZ 1.3+), when
   * seen. Kept apart from `till` because `rememberActiveOrder` rewrites
   * `till` on every render; only ever moves earlier (see `recordDeliveredAt`).
   */
  deliveredAt: string | null;
}

/**
 * An active record (no `endedAt` yet) older than this — by its last-seen
 * time, or by its delivery window's end — is treated as abandoned rather
 * than resolved: without this, an order left active across the real
 * delivery (app closed, reopened much later) would get stamped
 * `endedAt = now` on the next load and show "Delivered" for the next 6h at
 * a completely unrelated time.
 */
export const ACTIVE_STALE_MS = 6 * 60 * 60 * 1000;

function storageKey(device: string): string {
  return `rohlik-delivery-last:${device}`;
}

function readStored(storage: StorageLike, device: string): StoredMemory | null {
  let raw: string | null;
  try {
    raw = storage.getItem(storageKey(device));
  } catch {
    return null;
  }
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<StoredMemory> | null;
    if (!parsed || typeof parsed !== "object") return null;
    return {
      orderId: parsed.orderId ?? null,
      till: typeof parsed.till === "string" ? parsed.till : null,
      seenAt: typeof parsed.seenAt === "string" ? parsed.seenAt : null,
      endedAt: typeof parsed.endedAt === "string" ? parsed.endedAt : null,
      deliveredAt: typeof parsed.deliveredAt === "string" ? parsed.deliveredAt : null,
    };
  } catch {
    return null;
  }
}

function writeStored(storage: StorageLike, device: string, record: StoredMemory): void {
  try {
    storage.setItem(storageKey(device), JSON.stringify(record));
  } catch {
    // Ignore storage failures (private browsing, quota, disabled storage) —
    // the memory just won't survive a reload.
  }
}

function toMemory(stored: StoredMemory): RecentDeliveryMemory | null {
  if (!stored.endedAt) return null;
  const endedAt = new Date(stored.endedAt);
  if (Number.isNaN(endedAt.getTime())) return null;
  // A tracked delivery moment beats the booked window end.
  const tillIso = stored.deliveredAt ?? stored.till;
  const till = tillIso ? new Date(tillIso) : null;
  return { orderId: stored.orderId, till: till && !Number.isNaN(till.getTime()) ? till : null, endedAt };
}

/**
 * Records `order` as the currently active order, with no end time yet.
 * Call this on every render while `is_ordered` is on — it also overwrites
 * (and thereby implicitly clears) any previous order's memory, active or
 * resolved, so a brand new order always starts clean. `now` stamps `seenAt`
 * (defaults to the real current time; tests pass it explicitly).
 */
export function rememberActiveOrder(
  storage: StorageLike,
  device: string,
  order: { orderId: string | number | null; till: Date | null },
  now: Date = new Date(),
): void {
  const previous = readStored(storage, device);
  const sameOrder =
    previous != null && order.orderId != null && String(previous.orderId) === String(order.orderId);
  writeStored(storage, device, {
    orderId: order.orderId,
    till: order.till ? order.till.toISOString() : null,
    seenAt: now.toISOString(),
    endedAt: null,
    deliveredAt: sameOrder ? previous.deliveredAt : null,
  });
}

/**
 * Whether an active (`endedAt`-less) record is too old to trust as "still
 * genuinely active" — either it hasn't been seen in a render for
 * `ACTIVE_STALE_MS`, or its delivery window closed that long ago. A record
 * with no `seenAt` at all (written before this field existed) is treated as
 * stale, since there's no way to tell how old it really is.
 */
function isStaleActive(stored: StoredMemory, now: Date): boolean {
  const seenAt = stored.seenAt ? new Date(stored.seenAt) : null;
  if (!seenAt || Number.isNaN(seenAt.getTime())) return true;
  if (now.getTime() - seenAt.getTime() > ACTIVE_STALE_MS) return true;

  const till = stored.till ? new Date(stored.till) : null;
  if (till && !Number.isNaN(till.getTime()) && now.getTime() - till.getTime() > ACTIVE_STALE_MS) {
    return true;
  }
  return false;
}

/**
 * Reads the remembered delivery for `device`, if any has been resolved
 * (i.e. `is_ordered` has actually flipped off since — see
 * `resolveDelivery`). An order still active in storage reads as `null`
 * here, since it hasn't ended yet.
 */
export function loadRecentDelivery(storage: StorageLike, device: string): RecentDeliveryMemory | null {
  const stored = readStored(storage, device);
  return stored ? toMemory(stored) : null;
}

/**
 * Call this on every render while `is_ordered` is off. If storage holds an
 * order that's still marked active (no end time yet — including one from a
 * previous session, if the page reloaded right as delivery happened),
 * stamps it with `now` exactly once and persists the result. If that active
 * record is stale (see `isStaleActive`/`ACTIVE_STALE_MS`) — abandoned by a
 * session that closed before ever observing the order end — clears it and
 * returns `null` instead, rather than resolving it into a "delivered"
 * memory at an unrelated time. If it's already resolved, or nothing is
 * stored, returns the existing memory untouched.
 */
export function resolveDelivery(storage: StorageLike, device: string, now: Date): RecentDeliveryMemory | null {
  const stored = readStored(storage, device);
  if (!stored) return null;
  if (stored.endedAt) return toMemory(stored);

  if (isStaleActive(stored, now)) {
    clearMemory(storage, device);
    return null;
  }

  const resolved: StoredMemory = { ...stored, endedAt: now.toISOString() };
  writeStored(storage, device, resolved);
  return toMemory(resolved);
}

/** Drops any memory for `device`. */
export function clearMemory(storage: StorageLike, device: string): void {
  try {
    storage.removeItem(storageKey(device));
  } catch {
    // ignore
  }
}

/** Best-effort `localStorage` handle — never throws (private browsing, disabled storage, non-browser environments). */
export function getBrowserStorage(): StorageLike {
  try {
    if (typeof window !== "undefined" && window.localStorage) return window.localStorage;
  } catch {
    // fall through to the no-op stub below
  }
  return { getItem: () => null, setItem: () => {}, removeItem: () => {} };
}

/**
 * Remembers the moment live tracking reported `delivered` (HA-RohlikCZ
 * 1.3+). The integration keeps that status for only about 30 minutes; the
 * memory keeps "Delivered" (at the right time) for the usual 6 hours.
 *
 * - Same order (or ids unknown): pins `deliveredAt`, only ever moving it
 *   earlier — `last_changed` is re-stamped when HA restarts or the
 *   integration reloads, which must not push the time later.
 * - Another order still active: left alone, it is the one that matters.
 * - Nothing stored, or a finished older order: writes a resolved record, so
 *   a browser that never saw the order active still shows "Delivered".
 */
export function recordDeliveredAt(
  storage: StorageLike,
  device: string,
  orderId: string | number | null,
  at: Date,
): void {
  const stored = readStored(storage, device);
  const iso = at.toISOString();
  const sameOrder =
    stored != null &&
    (orderId == null || stored.orderId == null || String(stored.orderId) === String(orderId));

  if (stored && sameOrder) {
    const current = stored.deliveredAt ? new Date(stored.deliveredAt) : null;
    if (current && !Number.isNaN(current.getTime()) && current.getTime() <= at.getTime()) return;
    writeStored(storage, device, { ...stored, deliveredAt: iso });
    return;
  }
  if (stored && !stored.endedAt) return;
  writeStored(storage, device, { orderId, till: iso, seenAt: iso, endedAt: iso, deliveredAt: iso });
}

/**
 * The pinned tracked delivery moment for `orderId` (see `recordDeliveredAt`),
 * or null. Lets the card prefer it over a `last_changed` that an HA restart
 * re-stamped while the `delivered` status is still live.
 */
export function pinnedDeliveredAt(
  storage: StorageLike,
  device: string,
  orderId: string | number | null,
): Date | null {
  const stored = readStored(storage, device);
  if (!stored?.deliveredAt) return null;
  if (orderId != null && stored.orderId != null && String(stored.orderId) !== String(orderId)) return null;
  const at = new Date(stored.deliveredAt);
  return Number.isNaN(at.getTime()) ? null : at;
}
