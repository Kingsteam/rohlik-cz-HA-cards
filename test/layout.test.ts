import { describe, expect, it } from "vitest";
import { isFixedHeight } from "../src/core/layout";

describe("isFixedHeight", () => {
  it("is fixed when the user picked numeric rows in a sections view", () => {
    expect(isFixedHeight("grid", { rows: 4 })).toBe(true);
  });

  it("is content-sized for auto rows, no grid options, and masonry", () => {
    expect(isFixedHeight("grid", { rows: "auto" })).toBe(false);
    expect(isFixedHeight("grid", undefined)).toBe(false);
    expect(isFixedHeight("grid", { columns: 6 })).toBe(false);
    expect(isFixedHeight("masonry", { rows: 4 })).toBe(false);
  });

  it("is fixed in a panel view", () => {
    expect(isFixedHeight("panel", undefined)).toBe(true);
  });

  it("trusts numeric rows when HA doesn't set layout (older versions)", () => {
    expect(isFixedHeight(undefined, { rows: 4 })).toBe(true);
    expect(isFixedHeight(undefined, undefined)).toBe(false);
  });
});
