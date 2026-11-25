/**
 * Whether a card sits in a cell of fixed height (issue #13): a panel view,
 * or a sections view where the user picked a number of rows in the card's
 * layout settings. Everywhere else (rows "auto", masonry, sidebar) the card
 * is content-sized.
 *
 * `layout` is what HA's hui-card sets on the card element: "grid" in a
 * sections view, "panel" in a panel view, "masonry" otherwise (unset on old
 * HA versions, where numeric rows only exist in sections anyway).
 */
export function isFixedHeight(layout: string | undefined, gridOptions: unknown): boolean {
  if (layout === "panel") return true;
  if (layout === "masonry") return false;
  const rows = (gridOptions as { rows?: unknown } | null | undefined)?.rows;
  return typeof rows === "number";
}
