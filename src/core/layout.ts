/**
 * Whether a card sits in a cell of fixed height (issue #13), resolved the way
 * HA's hui-card does: the user's grid options merged over the card's own
 * (`getGridOptions()`), with the pre-2024.11 `layout_options` migrated when
 * `grid_options` is absent. A numeric `rows` result means a fixed cell.
 *
 * Only a sections view (`layout === "grid"`, set by hui-card) turns rows
 * into a cell height. Masonry views and stacks leave `layout` unset and
 * ignore stale `grid_options`; a panel view isn't treated as fixed either
 * (whether HA constrains the card's height there isn't guaranteed, and a
 * content-sized card simply scrolls the page).
 */
export function isFixedHeight(
  layout: string | undefined,
  ownOptions: unknown,
  gridOptions?: unknown,
  legacyLayoutOptions?: unknown,
): boolean {
  if (layout !== "grid") return false;
  const legacy = legacyLayoutOptions as { grid_rows?: unknown; grid_columns?: unknown } | null | undefined;
  const user =
    gridOptions != null
      ? (gridOptions as Record<string, unknown>)
      : legacy
        ? { rows: legacy.grid_rows, columns: legacy.grid_columns }
        : {};
  const merged: Record<string, unknown> = { ...(ownOptions as Record<string, unknown> | undefined) };
  for (const [key, value] of Object.entries(user)) {
    if (value !== undefined) merged[key] = value;
  }
  return typeof merged.rows === "number";
}

/**
 * HA wrappers known to give a nested card the full cell height (the
 * horizontal stack stretches each card; the conditional card passes its
 * size through). Any other wrapper on the way — vertical stack, grid card,
 * third-party layout cards — gives no definite height to fill, so the card
 * stays content-sized there, exactly like HA's own cards.
 */
const HEIGHT_PASSING_WRAPPERS = new Set(["hui-horizontal-stack-card", "hui-conditional-card"]);

/** Elements on the way that are plumbing, not wrappers (card hosts, section). */
const TRANSPARENT = new Set(["hui-card", "hui-card-edit-mode", "hui-card-options"]);

/**
 * Whether `el` sits inside a fixed-height sections cell (`.card.fit-rows`,
 * hui-grid-section.ts) through wrappers that don't pass `layout` on but do
 * pass the cell height down (HEIGHT_PASSING_WRAPPERS). Walks the composed
 * tree a bounded number of steps and stops at the section itself.
 */
export function insideFixedSectionCell(el: Element, maxSteps = 24): boolean {
  let node: Node | null = el.parentNode;
  for (let step = 0; node && step < maxSteps; step++) {
    if (node instanceof Element) {
      if (node.classList.contains("card") && node.classList.contains("fit-rows")) return true;
      const tag = node.tagName.toLowerCase();
      if (tag === "hui-grid-section" || tag === "hui-section" || tag === "body") return false;
      // Any other custom element (a wrapper card) must be a known
      // height-passing one, else the card stays content-sized.
      if (tag.includes("-") && !HEIGHT_PASSING_WRAPPERS.has(tag) && !TRANSPARENT.has(tag)) return false;
    }
    node = node instanceof ShadowRoot ? node.host : node.parentNode;
  }
  return false;
}
