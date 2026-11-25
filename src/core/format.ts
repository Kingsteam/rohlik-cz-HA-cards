import type { HomeAssistant } from "./types";

/**
 * Parses an entity state string into a Date, returning null for the special
 * `unknown` / `unavailable` states (and any other unparsable value).
 */
export function parseTs(state: string | undefined | null): Date | null {
  if (!state || state === "unknown" || state === "unavailable") return null;
  const date = new Date(state);
  if (Number.isNaN(date.getTime())) return null;
  return date;
}

/** Language the card should speak: `hass.locale.language`, then `hass.language`, then `en`. */
export function lang(hass: HomeAssistant): string {
  return hass.locale?.language || hass.language || "en";
}

/**
 * Formats an amount the way Czech shops print it: number in the card's
 * locale, two decimals, symbol after ("1 486,00 Kč" / "1,486.00 Kč").
 * Non-CZK currencies fall back to the locale's own currency formatting.
 */
export function formatMoney(hass: HomeAssistant, amount: number, currency = "CZK"): string {
  const locale = lang(hass);
  if (currency === "CZK") {
    const num = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
    return `${num}\u00a0Kč`;
  }
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      currencyDisplay: "narrowSymbol",
    }).format(amount);
  } catch {
    return `${new Intl.NumberFormat(locale).format(amount)} ${currency}`;
  }
}

/**
 * "350 m" / "1.4 km" — or miles/feet when the HA unit system is imperial.
 * Takes metres (see `cards/delivery-card/input.ts#distanceInMetres`).
 */
export function formatDistance(hass: HomeAssistant, metres: number): string {
  const locale = lang(hass);
  const imperial = hass.config?.unit_system?.length === "mi";
  const fmt = (value: number, unit: string, digits: number): string =>
    new Intl.NumberFormat(locale, { style: "unit", unit, maximumFractionDigits: digits }).format(value);
  // Round before choosing the unit, so 997 m reads "1 km", not "1,000 m".
  if (imperial) {
    const feet = Math.round(metres / 0.3048 / 10) * 10;
    return feet < 1000 ? fmt(feet, "foot", 0) : fmt(metres / 1609.344, "mile", 1);
  }
  const rounded = Math.round(metres / 10) * 10;
  return rounded < 1000 ? fmt(rounded, "meter", 0) : fmt(metres / 1000, "kilometer", 1);
}

export function formatTime(hass: HomeAssistant, date: Date): string {
  return new Intl.DateTimeFormat(lang(hass), {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

export interface RelativeDayDict {
  today: string;
  tomorrow: string;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * "Today 17:00" / "Tomorrow 08:00" / "Mon 15 Sep 08:00".
 * `dict` supplies the localized "today"/"tomorrow" words (see core/localize.ts).
 */
export function formatRelativeDay(hass: HomeAssistant, date: Date, dict: RelativeDayDict): string {
  const locale = lang(hass);
  const time = formatTime(hass, date);
  const now = new Date();
  if (isSameDay(date, now)) {
    return `${dict.today} ${time}`;
  }
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  if (isSameDay(date, tomorrow)) {
    return `${dict.tomorrow} ${time}`;
  }
  const dateLabel = new Intl.DateTimeFormat(locale, {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(date);
  return `${dateLabel} ${time}`;
}

/**
 * Locale affixes wrapping a relative duration, e.g. en future "in {}",
 * cs future "za {}", en past "{} ago", cs past "před {}". Derived from
 * `Intl.RelativeTimeFormat` word order for the two languages this project
 * ships (cs/en); unrecognised languages fall back to the English affixes
 * while the duration itself still comes from `Intl.NumberFormat`, so output
 * stays grammatically odd rather than wrong.
 */
const RELATIVE_AFFIXES: Record<string, { future: [string, string]; past: [string, string] }> = {
  en: { future: ["in ", ""], past: ["", " ago"] },
  cs: { future: ["za ", ""], past: ["před ", ""] },
};

function affixesFor(locale: string, tense: "future" | "past"): [string, string] {
  const short = locale.slice(0, 2).toLowerCase();
  const table = RELATIVE_AFFIXES[short] ?? RELATIVE_AFFIXES.en;
  return table[tense];
}

function unitShort(locale: string, value: number, unit: Intl.RelativeTimeFormatUnit): string {
  const singularUnit = unit.replace(/s$/, "") as
    | "second"
    | "minute"
    | "hour"
    | "day"
    | "week"
    | "month"
    | "year";
  return new Intl.NumberFormat(locale, {
    style: "unit",
    unit: singularUnit,
    unitDisplay: "short",
  }).format(value);
}

function wrap(prefix: string, body: string, suffix: string): string {
  return `${prefix}${body}${suffix}`;
}

/**
 * Compact countdown to a future date: "in 3 h 20 min" / "in 12 min".
 */
export function formatCountdown(hass: HomeAssistant, date: Date): string {
  const locale = lang(hass);
  const [prefix, suffix] = affixesFor(locale, "future");
  const totalSeconds = Math.max(0, Math.round((date.getTime() - Date.now()) / 1000));
  const totalMinutes = Math.round(totalSeconds / 60);

  if (totalSeconds < 60) {
    return wrap(prefix, unitShort(locale, totalSeconds, "seconds"), suffix);
  }
  if (totalMinutes < 60) {
    return wrap(prefix, unitShort(locale, totalMinutes, "minutes"), suffix);
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours < 24) {
    const hourStr = unitShort(locale, hours, "hours");
    if (minutes === 0) return wrap(prefix, hourStr, suffix);
    return wrap(prefix, `${hourStr} ${unitShort(locale, minutes, "minutes")}`, suffix);
  }

  const days = Math.round(totalMinutes / 60 / 24);
  return wrap(prefix, unitShort(locale, days, "days"), suffix);
}

/**
 * A whole number of minutes as "12 min" / "1 hr 20 min" (en; cs "1 h 20 min"), or with the
 * locale's future affixes ("in 12 min" / "za 12 min") when `relative`.
 */
export function formatMinutes(hass: HomeAssistant, minutes: number, relative = false): string {
  const locale = lang(hass);
  const total = Math.max(0, Math.round(minutes));
  const hours = Math.floor(total / 60);
  const rest = total % 60;
  let body: string;
  if (hours === 0) body = unitShort(locale, rest, "minutes");
  else if (rest === 0) body = unitShort(locale, hours, "hours");
  else body = `${unitShort(locale, hours, "hours")} ${unitShort(locale, rest, "minutes")}`;
  if (!relative) return body;
  const [prefix, suffix] = affixesFor(locale, "future");
  return wrap(prefix, body, suffix);
}

/**
 * Compact "time since" a past date: "4 min ago" / "před 4 min".
 */
export function formatAgo(hass: HomeAssistant, date: Date): string {
  const locale = lang(hass);
  const [prefix, suffix] = affixesFor(locale, "past");
  const totalSeconds = Math.max(0, Math.round((Date.now() - date.getTime()) / 1000));
  const totalMinutes = Math.round(totalSeconds / 60);

  if (totalSeconds < 60) {
    return wrap(prefix, unitShort(locale, totalSeconds, "seconds"), suffix);
  }
  if (totalMinutes < 60) {
    return wrap(prefix, unitShort(locale, totalMinutes, "minutes"), suffix);
  }

  const totalHours = Math.round(totalMinutes / 60);
  if (totalHours < 24) {
    return wrap(prefix, unitShort(locale, totalHours, "hours"), suffix);
  }

  const days = Math.round(totalHours / 24);
  return wrap(prefix, unitShort(locale, days, "days"), suffix);
}
