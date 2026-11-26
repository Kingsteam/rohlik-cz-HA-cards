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
