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
 * Wrappers that stack their cards and give each one only its content height
 * (no definite height to fill): a card inside one is content-sized even in
 * a fixed cell, exactly like HA's own cards there.
 */
const CONTENT_SIZED_WRAPPERS = new Set(["hui-vertical-stack-card", "hui-grid-card"]);

/**
 * Whether `el` sits inside a fixed-height sections cell through a wrapper
 * that doesn't pass `layout` on but does pass the cell height down
 * (horizontal stack, conditional card). HA marks such a cell
 * `.card.fit-rows` (hui-grid-section.ts). A vertical stack or grid card on
 * the way makes the card content-sized instead. Walks the composed tree a
 * bounded number of steps and stops at the section itself.
 */
export function insideFixedSectionCell(el: Element, maxSteps = 24): boolean {
  let node: Node | null = el.parentNode;
  for (let step = 0; node && step < maxSteps; step++) {
    if (node instanceof Element) {
      if (node.classList.contains("card") && node.classList.contains("fit-rows")) return true;
      const tag = node.tagName.toLowerCase();
      if (CONTENT_SIZED_WRAPPERS.has(tag)) return false;
      if (tag === "hui-grid-section" || tag === "hui-section" || tag === "body") return false;
    }
    node = node instanceof ShadowRoot ? node.host : node.parentNode;
  }
  return false;
}
