/**
 * Builds `DeliveryStateInput` from the device's entities. Shared by
 * `rohlik-delivery-card` and `rohlik-delivery-badge`, which only differ in
 * how they read an entity (both resolve `translation_key` → state).
 */
import type { HassEntity } from "../../core/types";
import { parseTs } from "../../core/format";
import {
  TRACKING_STATUSES,
  type DeliveryOrderData,
  type DeliverySlotKey,
  type DeliveryStateInput,
  type EtaSource,
  type TrackingStatus,
} from "./state";
import {
  clearMemory,
  getBrowserStorage,
  loadRecentDelivery,
  recordDeliveredAt,
  rememberActiveOrder,
  resolveDelivery,
  type RecentDeliveryMemory,
} from "./memory";

export type EntityReader = (key: string) => HassEntity | undefined;

const SLOT_KEYS: readonly DeliverySlotKey[] = ["express", "standard", "eco"];

const ETA_SOURCES: readonly EtaSource[] = ["tracking", "announcement", "slot", "last_known"];

/** Metres per unit, for the units HA can convert a distance sensor to. */
const METRES_PER: Record<string, number> = {
  m: 1,
  km: 1000,
  mi: 1609.344,
  nmi: 1852,
  yd: 0.9144,
  ft: 0.3048,
  in: 0.0254,
  cm: 0.01,
  mm: 0.001,
};

function known(entity: HassEntity | undefined): string | null {
  const value = entity?.state;
  if (!value || value === "unknown" || value === "unavailable") return null;
  return value;
}

function num(entity: HassEntity | undefined): number | null {
  const value = known(entity);
  if (value == null) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

/**
 * The courier distance in metres. HA shows the sensor in its suggested unit
 * (km) or the user's chosen one, so convert using the state's own unit.
 */
export function distanceInMetres(entity: HassEntity | undefined): number | null {
  const value = num(entity);
  if (value == null) return null;
  const unit = String(entity?.attributes?.unit_of_measurement ?? "m");
  const factor = METRES_PER[unit];
  return factor === undefined ? null : value * factor;
}

/**
 * Watches `is_ordered` and persists the "an order just finished" marker
 * across reloads (see `./memory.ts`). Cheap `localStorage` reads/writes.
 */
function syncMemory(
  read: EntityReader,
  device: string,
  orderData: DeliveryOrderData | null,
): RecentDeliveryMemory | null {
  const storage = getBrowserStorage();
  const memory = syncOrderMemory(storage, read, device, orderData);

  // Tracking knows the real delivery moment; keep it once the status expires.
  const status = read("delivery_status");
  const deliveredAt = status?.state === "delivered" ? parseTs(status.last_changed) : null;
  if (deliveredAt) {
    const trackedId = status?.attributes?.order_id;
    recordDeliveredAt(
      storage,
      device,
      typeof trackedId === "string" || typeof trackedId === "number" ? trackedId : null,
      deliveredAt,
    );
    return memory ? loadRecentDelivery(storage, device) : null;
  }
  return memory;
}

function syncOrderMemory(
  storage: ReturnType<typeof getBrowserStorage>,
  read: EntityReader,
  device: string,
  orderData: DeliveryOrderData | null,
): RecentDeliveryMemory | null {
  // While the sensor is unknown/unavailable (HA startup, integration
  // reloading) nothing can be concluded: read the memory, never resolve it.
  const orderedState = read("is_ordered")?.state;
  if (orderedState !== "on" && orderedState !== "off") {
    return loadRecentDelivery(storage, device);
  }

  if (orderedState === "on") {
    const orderId = orderData?.id ?? null;
    const previous = loadRecentDelivery(storage, device);
    if (previous && orderId != null && previous.orderId !== orderId) {
      clearMemory(storage, device);
    }
    rememberActiveOrder(storage, device, {
      orderId,
      till: parseTs(read("next_order_till")?.state),
    });
    return null;
  }

  return resolveDelivery(storage, device, new Date());
}

export function readDeliveryInput(read: EntityReader, device: string): DeliveryStateInput {
  const attr = (key: string, name: string): unknown => read(key)?.attributes?.[name];
  const orderData = (attr("is_ordered", "order_data") as DeliveryOrderData | undefined) ?? null;

  const statusEntity = read("delivery_status");
  const rawStatus = known(statusEntity);
  const trackingStatus = TRACKING_STATUSES.includes(rawStatus as TrackingStatus)
    ? (rawStatus as TrackingStatus)
    : null;
  const rawSource = attr("delivery_time_remaining", "source");
  const etaSource = ETA_SOURCES.includes(rawSource as EtaSource) ? (rawSource as EtaSource) : null;
  const trackingOrderId = attr("delivery_status", "order_id");

  return {
    isOrdered: read("is_ordered")?.state === "on",
    since: parseTs(read("next_order_since")?.state),
    till: parseTs(read("next_order_till")?.state),
    eta: parseTs(read("delivery_time")?.state),
    orderData,
    announcementText: known(read("delivery_info")),
    announcementExtra: (attr("delivery_info", "Additional Content") as string | undefined) ?? null,
    announcementUpdatedAt: parseTs(attr("delivery_info", "Updated At") as string | undefined),
    lastOrderAt: parseTs(read("last_order")?.state),
    lastOrderItems: (attr("last_order", "Items") as number | undefined) ?? null,
    lastOrderPrice: (attr("last_order", "Price") as number | undefined) ?? null,
    firstDeliveryText: known(read("first_delivery")),
    isReserved: read("is_reserved")?.state === "on",
    isExpressAvailable: read("is_express_available")?.state === "on",
    recentDelivery: syncMemory(read, device, orderData),
    slots: SLOT_KEYS.map((key) => ({
      key,
      start: parseTs(read(`${key}_slot`)?.state),
      price: (attr(`${key}_slot`, "Price") as number | undefined) ?? null,
    })),
    tracking: {
      status: trackingStatus,
      // `last_changed` of the status is when the courier reached it — for
      // `delivered`, the actual delivery moment.
      statusSince: trackingStatus ? parseTs(statusEntity?.last_changed) : null,
      orderId:
        typeof trackingOrderId === "string" || typeof trackingOrderId === "number"
          ? trackingOrderId
          : null,
      stopsBefore: num(read("stops_before")),
      distanceM: distanceInMetres(read("courier_distance")),
      minutesLeft: num(read("delivery_time_remaining")),
      etaSource,
      courierAtDoor: read("courier_at_door")?.state === "on",
      lastMile: read("last_mile")?.state === "on",
    },
  };
}
