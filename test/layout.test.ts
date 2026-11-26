import { describe, expect, it } from "vitest";
import { isFixedHeight } from "../src/core/layout";

describe("isFixedHeight", () => {
  it("is fixed when the user picked numeric rows in a sections view", () => {
    expect(isFixedHeight("grid", { rows: 4 })).toBe(true);
  });

  it("is content-sized for auto rows or no grid options in a sections view", () => {
    expect(isFixedHeight("grid", { rows: "auto" })).toBe(false);
    expect(isFixedHeight("grid", undefined)).toBe(false);
    expect(isFixedHeight("grid", { columns: 6 })).toBe(false);
  });

  it("ignores stale numeric rows outside a sections view (masonry, stacks leave layout unset)", () => {
    expect(isFixedHeight(undefined, { rows: 8 })).toBe(false);
    expect(isFixedHeight("masonry", { rows: 4 })).toBe(false);
  });

  it("does not treat a panel view as fixed", () => {
    expect(isFixedHeight("panel", undefined)).toBe(false);
    expect(isFixedHeight("panel", { rows: 4 })).toBe(false);
  });

  it("honours the legacy layout_options.grid_rows when grid_options is absent", () => {
    expect(isFixedHeight("grid", undefined, { grid_rows: 4 })).toBe(true);
    expect(isFixedHeight("grid", undefined, { grid_rows: "auto" })).toBe(false);
    // grid_options wins over the legacy key, as in HA's hui-card.
    expect(isFixedHeight("grid", { rows: "auto" }, { grid_rows: 4 })).toBe(false);
  });
});
