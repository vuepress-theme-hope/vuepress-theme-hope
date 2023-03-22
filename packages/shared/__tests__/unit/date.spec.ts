import { describe, expect, it } from "vitest";

import { getDate } from "../../src/client/utils/date.js";

describe("getDate()", () => {
  it("Should get a date", () => {
    expect(getDate("2020-01-01")).toBeInstanceOf(Date);
    expect(getDate("2020-01-01 12:00:00")).toBeInstanceOf(Date);
    expect(getDate("2020-01-01T12:00:00Z")).toBeInstanceOf(Date);
    expect(getDate("2020/01/01")).toBeInstanceOf(Date);
    expect(getDate("2020/1/1")).toBeInstanceOf(Date);
    expect(getDate("2020/1/1 1:00")).toBeInstanceOf(Date);
    expect(getDate(12)).toBeInstanceOf(Date);
    expect(getDate(1679494007000)).toBeInstanceOf(Date);
  });

  it("Shold return null", () => {
    expect(getDate("")).toBe(null);
    expect(getDate(undefined)).toBe(null);
    expect(getDate(null)).toBe(null);
  });
});
