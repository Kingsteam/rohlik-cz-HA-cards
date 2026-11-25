import type { CustomCardEntry, HomeAssistant, LovelaceCardConfig } from "./types";
import { ROHLIK_PLATFORM } from "./discovery";

// Replaced at build time by rollup.config.mjs with the package.json version.
declare const __ROHLIK_CARDS_VERSION__: string;

const VERSION =
  typeof __ROHLIK_CARDS_VERSION__ !== "undefined" ? __ROHLIK_CARDS_VERSION__ : "dev";

let bannerPrinted = false;

function printBanner(): void {
  if (bannerPrinted) return;
  bannerPrinted = true;
  console.info(
    `%c ROHLIK-CARDS %c v${VERSION} `,
    "color: white; background: #d4145a; font-weight: 700;",
    "color: #d4145a; background: white; font-weight: 700;",
  );
}

export interface RegisterCardOptions extends CustomCardEntry {
  preview?: boolean;
}

export function registerCard(options: RegisterCardOptions): void {
  printBanner();
  window.customCards = window.customCards ?? [];
  // The bundle can be loaded twice (HACS resource plus a manual one): keep one picker entry.
  if (window.customCards.some((entry) => entry.type === options.type)) return;
  window.customCards.push({ preview: true, ...options });
}

export function registerBadge(options: RegisterCardOptions): void {
  printBanner();
  window.customBadges = window.customBadges ?? [];
  if (window.customBadges.some((entry) => entry.type === options.type)) return;
  window.customBadges.push({ preview: true, ...options });
}

/**
 * Builds a `getEntitySuggestion` for the card picker (HA 2026.6+): when the
 * picked entity is a Rohlík entity whose `translation_key` is one of `keys`,
 * suggest `type` pre-filled with that entity's device. Never throws.
 */
export function suggestForKeys(
  type: string,
  keys: readonly string[],
): NonNullable<CustomCardEntry["getEntitySuggestion"]> {
  const wanted = new Set(keys);
  return (hass: HomeAssistant, entityId: string) => {
    const entry = hass?.entities?.[entityId];
    if (!entry || entry.platform !== ROHLIK_PLATFORM || !entry.device_id) return null;
    if (!entry.translation_key || !wanted.has(entry.translation_key)) return null;
    const config: LovelaceCardConfig = { type: `custom:${type}`, device: entry.device_id };
    return { config };
  };
}
