import { describe, expect, it } from "vitest";
import { isFixedHeight } from "../src/core/layout";

const AUTO = { columns: 12, rows: "auto" };
const COMPACT = { columns: 6, rows: 2 };

describe("isFixedHeight", () => {
  it("is fixed when the user picked numeric rows in a sections view", () => {
    expect(isFixedHeight("grid", AUTO, { rows: 4 })).toBe(true);
  });

  it("is content-sized for auto rows or no user rows in a sections view", () => {
    expect(isFixedHeight("grid", AUTO, { rows: "auto" })).toBe(false);
    expect(isFixedHeight("grid", AUTO, undefined)).toBe(false);
    expect(isFixedHeight("grid", AUTO, { columns: 6 })).toBe(false);
  });

  it("merges the user's options over the card's own, like hui-card", () => {
    // Compact delivery: own default 2 rows is a fixed cell...
    expect(isFixedHeight("grid", COMPACT, undefined)).toBe(true);
    // ...also when the user only changed the width,
    expect(isFixedHeight("grid", COMPACT, { columns: 12 })).toBe(true);
    expect(isFixedHeight("grid", COMPACT, undefined, { grid_columns: 2 })).toBe(true);
    // but not when the user switched it to fit its content.
    expect(isFixedHeight("grid", COMPACT, { rows: "auto" })).toBe(false);
  });

  it("ignores stale numeric rows outside a sections view (masonry, stacks leave layout unset)", () => {
    expect(isFixedHeight(undefined, AUTO, { rows: 8 })).toBe(false);
    expect(isFixedHeight("masonry", AUTO, { rows: 4 })).toBe(false);
    expect(isFixedHeight(undefined, COMPACT, undefined)).toBe(false);
  });

  it("does not treat a panel view as fixed", () => {
    expect(isFixedHeight("panel", AUTO, undefined)).toBe(false);
    expect(isFixedHeight("panel", AUTO, { rows: 4 })).toBe(false);
  });

  it("honours the legacy layout_options.grid_rows when grid_options is absent", () => {
    expect(isFixedHeight("grid", AUTO, undefined, { grid_rows: 4 })).toBe(true);
    expect(isFixedHeight("grid", AUTO, undefined, { grid_rows: "auto" })).toBe(false);
    // grid_options wins over the legacy key, as in HA's hui-card.
    expect(isFixedHeight("grid", AUTO, { rows: "auto" }, { grid_rows: 4 })).toBe(false);
  });
});
