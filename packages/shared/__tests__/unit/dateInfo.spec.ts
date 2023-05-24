import { describe, expect, it } from "vitest";

import { compareDate, getDateInfo } from "../../src/node/utils/date.js";

const getCurrentDate = (date: Date): Date =>
  new Date(date.getTime() + new Date().getTimezoneOffset() * 60 * 1000);

describe("getDateInfo()", () => {
  it("Should return null", () => {
    expect(getDateInfo(undefined)).toEqual(null);
  });

  describe("Should parse day", () => {
    it("date string", () => {
      expect(getDateInfo("2020-04-04T00:00:00.000Z", "Asia/Shanghai")).toEqual({
        info: {
          day: 4,
          hour: 8,
          minute: 0,
          month: 4,
          second: 0,
          year: 2020,
        },
        value: new Date("2020-04-04T00:00:00.000Z"),
        type: "full",
      });

      expect(getDateInfo("2020-04-04T00:00:00.000Z", "UTC")).toEqual({
        info: {
          day: 4,
          month: 4,
          year: 2020,
        },
        value: new Date("2020-04-04T00:00:00.000Z"),
        type: "date",
      });

      expect(getDateInfo("2020-04-04T00:00:00.000Z", "Asia/shanghai")).toEqual({
        info: {
          day: 4,
          hour: 8,
          minute: 0,
          month: 4,
          second: 0,
          year: 2020,
        },
        value: new Date("2020-04-04T00:00:00.000Z"),
        type: "full",
      });
    });

    it("date", () => {
      expect(getDateInfo("1918-01-01")).toEqual({
        info: {
          day: 1,
          month: 1,
          year: 1918,
        },
        value: getCurrentDate(new Date("1918-01-01")),
        type: "date",
      });
    });

    it("simple date like string", () => {
      expect(getDateInfo("2018-1-1")).toEqual({
        info: {
          day: 1,
          month: 1,
          year: 2018,
        },
        value: getCurrentDate(new Date("2018-01-01")),
        type: "date",
      });
    });

    it("date like string with splash", () => {
      expect(getDateInfo("1918/01/01")).toEqual({
        info: {
          day: 1,
          month: 1,
          year: 1918,
        },
        value: getCurrentDate(new Date("1918-01-01")),
        type: "date",
      });

      expect(getDateInfo("2018/1/1")).toEqual({
        info: {
          day: 1,
          month: 1,
          year: 2018,
        },
        value: getCurrentDate(new Date("2018-01-01")),
        type: "date",
      });
    });

    it("date string with spaces", () => {
      expect(getDateInfo(" 1918-01-01")).toEqual({
        info: {
          day: 1,
          month: 1,
          year: 1918,
        },
        value: getCurrentDate(new Date("1918-01-01")),
        type: "date",
      });
    });

    it("date like string with spaces", () => {
      expect(getDateInfo(" 2018-1-1 ")).toEqual({
        info: {
          day: 1,
          month: 1,
          year: 2018,
        },
        value: getCurrentDate(new Date("2018-01-01")),
        type: "date",
      });
    });

    it("date like string with splash and spaces", () => {
      expect(getDateInfo("  2018/1/1  ")).toEqual({
        info: {
          day: 1,
          month: 1,
          year: 2018,
        },
        value: getCurrentDate(new Date("2018-01-01")),
        type: "date",
      });
    });

    it("date like string with spaces and short year", () => {
      expect(getDateInfo("18-01-01")).toEqual({
        info: {
          day: 1,
          month: 1,
          year: 2018,
        },
        value: getCurrentDate(new Date("2018-01-01")),
        type: "date",
      });
    });

    it("date like string with splash and spaces and short year", () => {
      expect(getDateInfo("18/01/01 ")).toEqual({
        info: {
          day: 1,
          month: 1,
          year: 2018,
        },
        value: getCurrentDate(new Date("2018-01-01")),
        type: "date",
      });
    });
  });

  describe("Should parse time", () => {
    it("Should parse time with hours and minutes", () => {
      expect(getDateInfo("12:30")).toEqual({
        info: { hour: 12, minute: 30, second: 0 },
        value: undefined,
        type: "time",
      });

      expect(getDateInfo("00:00")).toEqual({
        info: { hour: 0, minute: 0, second: 0 },
        value: undefined,
        type: "time",
      });
    });

    it("Should parse time with hours, minutes and seconds", () => {
      expect(getDateInfo("12:30:00")).toEqual({
        info: { hour: 12, minute: 30, second: 0 },
        value: undefined,
        type: "time",
      });

      expect(getDateInfo("12:30:32")).toEqual({
        info: { hour: 12, minute: 30, second: 32 },
        value: undefined,
        type: "time",
      });
    });

    it("Should parse time with hours, minutes along with spaces", () => {
      expect(getDateInfo("  12:30")).toEqual({
        info: { hour: 12, minute: 30, second: 0 },
        value: undefined,
        type: "time",
      });

      expect(getDateInfo("00:00  ")).toEqual({
        info: { hour: 0, minute: 0, second: 0 },
        value: undefined,
        type: "time",
      });
    });

    it("Should parse time with hours, minutes and seconds along with spaces", () => {
      expect(getDateInfo(" 12:30:00 ")).toEqual({
        info: { hour: 12, minute: 30, second: 0 },
        value: undefined,
        type: "time",
      });

      expect(getDateInfo("   12:30:32   ")).toEqual({
        info: { hour: 12, minute: 30, second: 32 },
        value: undefined,
        type: "time",
      });
    });
  });

  it("Should parse whole date", () => {
    expect(getDateInfo("2018/12/1 12:30")).toEqual({
      info: {
        day: 1,
        hour: 12,
        minute: 30,
        month: 12,
        second: 0,
        year: 2018,
      },
      value: new Date("2018-12-01 12:30"),
      type: "full",
    });

    expect(getDateInfo("18/12/01 12:30")).toEqual({
      info: {
        day: 1,
        hour: 12,
        minute: 30,
        month: 12,
        second: 0,
        year: 2018,
      },
      value: new Date("2018-12-01 12:30"),
      type: "full",
    });

    expect(getDateInfo("  2018/12/01 12:30:00  ")).toEqual({
      info: {
        day: 1,
        hour: 12,
        minute: 30,
        month: 12,
        second: 0,
        year: 2018,
      },
      value: new Date("2018-12-01 12:30"),
      type: "full",
    });

    expect(getDateInfo("  2018-12-01 12:30:00  ")).toEqual({
      info: {
        day: 1,
        hour: 12,
        minute: 30,
        month: 12,
        second: 0,
        year: 2018,
      },
      value: new Date("2018-12-01 12:30"),
      type: "full",
    });

    expect(getDateInfo("  2018-12-1 12:30:00  ")).toEqual({
      info: {
        day: 1,
        hour: 12,
        minute: 30,
        month: 12,
        second: 0,
        year: 2018,
      },
      value: new Date("2018-12-01 12:30"),
      type: "full",
    });
  });

  it("Should handle language", () => {
    expect(getDateInfo("2020-04-04T00:00:00.000Z", "Asia/Shanghai")).toEqual({
      info: {
        day: 4,
        hour: 8,
        minute: 0,
        month: 4,
        second: 0,
        year: 2020,
      },
      value: new Date("2020-04-04T00:00:00.000Z"),
      type: "full",
    });
  });
});

describe("compareDate()", () => {
  it("Should compare date", () => {
    expect(
      compareDate(
        new Date("2020-04-04T00:00:00.000Z"),
        new Date("2020-05-05T00:00:00.000Z")
      )
    ).toBeGreaterThan(0);
    expect(
      compareDate(
        new Date("2020-05-05T00:00:00.000Z"),
        new Date("2020-04-04T00:00:00.000Z")
      )
    ).toBeLessThan(0);
    expect(
      compareDate(
        new Date("2020-04-04T00:00:00.000Z"),
        new Date("2020-04-04T00:00:00.000Z")
      )
    ).toBe(0);
  });
});
