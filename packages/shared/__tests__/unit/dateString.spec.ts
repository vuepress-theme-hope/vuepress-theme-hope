import { describe, expect, it } from "vitest";

import {
  getDateString,
  getFullDateString,
  getTimeString,
} from "../../src/node/utils/index.js";

describe("getDateString", () => {
  it("should return date string", () => {
    expect(getDateString(new Date("2021-01-01"))).toBe("2021-01-01");
  });

  it("should return date string with full date", () => {
    expect(getDateString(new Date("2021-01-11 10:11:12"))).toBe("2021-01-11");
  });
});

describe("getTimeString", () => {
  it("should return time string with date", () => {
    expect(getTimeString(new Date("2021-01-01"))).toBe("00:00:00");
  });

  it("should return time string with full date", () => {
    expect(getTimeString(new Date("2021-01-11 10:11:12"))).toBe("10:11:12");
  });
});

describe("getFullDateString", () => {
  it("should return full date string", () => {
    expect(getFullDateString(new Date("2021-01-01"))).toBe(
      "2021-01-01 00:00:00",
    );
  });

  it("should return full date string with full date", () => {
    expect(getFullDateString(new Date("2021-01-11 10:11:12"))).toBe(
      "2021-01-11 10:11:12",
    );
  });
});
