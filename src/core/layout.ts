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
 * Whether `el` sits inside a fixed-height sections cell through a wrapper
 * that doesn't pass `layout` on (horizontal/vertical stack, grid card,
 * conditional card). HA marks such a cell `.card.fit-rows`
 * (hui-grid-section.ts). Walks the composed tree a bounded number of steps
 * and stops at the section itself.
 */
export function insideFixedSectionCell(el: Element, maxSteps = 24): boolean {
  let node: Node | null = el.parentNode;
  for (let step = 0; node && step < maxSteps; step++) {
    if (node instanceof Element) {
      if (node.classList.contains("card") && node.classList.contains("fit-rows")) return true;
      const tag = node.tagName.toLowerCase();
      if (tag === "hui-grid-section" || tag === "hui-section" || tag === "body") return false;
    }
    node = node instanceof ShadowRoot ? node.host : node.parentNode;
  }
  return false;
}
