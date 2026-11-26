/**
 * Whether a card sits in a cell of fixed height (issue #13): a sections view
 * where the user picked a number of rows in the card's layout settings.
 * Everywhere else (rows "auto", masonry, stacks, panel) the card is
 * content-sized.
 *
 * `layout` is what HA's hui-card sets on the card element: "grid" in a
 * sections view (and the view footer), "panel" in a panel view; masonry and
 * stack children leave it unset. Only a sections cell gets a fixed height
 * from `rows`, so numeric rows count only there — a card moved to masonry or
 * into a stack can keep stale `grid_options` that HA ignores.
 *
 * A panel view is not treated as fixed: whether HA constrains the card's
 * height there isn't guaranteed, and a content-sized card simply scrolls the
 * page, which is safe.
 *
 * HA still honours the pre-2024.11 `layout_options.grid_rows` when
 * `grid_options` is absent (hui-card.ts migrates it), so that counts too.
 */
export function isFixedHeight(
  layout: string | undefined,
  gridOptions: unknown,
  legacyLayoutOptions?: unknown,
): boolean {
  if (layout !== "grid") return false;
  if (gridOptions != null) {
    return typeof (gridOptions as { rows?: unknown }).rows === "number";
  }
  return typeof (legacyLayoutOptions as { grid_rows?: unknown } | null | undefined)?.grid_rows === "number";
}
