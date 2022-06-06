import { describe, it, expect } from "vitest";
import { getDate } from "../../src/shared/utils/date";

const getCurrentDate = (date: Date): Date =>
  new Date(date.getTime() + new Date().getTimezoneOffset() * 60 * 1000);

describe("getDate()", () => {
  describe("Should parse day", () => {
    it("date string", () => {
      expect(getDate("2020-04-04T00:00:00.000Z", "Asia/Shanghai")).toEqual({
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

      expect(getDate("2020-04-04T00:00:00.000Z", "UTC")).toEqual({
        info: {
          day: 4,
          month: 4,
          year: 2020,
        },
        value: new Date("2020-04-04T00:00:00.000Z"),
        type: "date",
      });

      expect(getDate("2020-04-04T00:00:00.000Z", "Asia/shanghai")).toEqual({
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
      expect(getDate("1918-01-01")).toEqual({
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
      expect(getDate("2018-1-1")).toEqual({
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
      expect(getDate("1918/01/01")).toEqual({
        info: {
          day: 1,
          month: 1,
          year: 1918,
        },
        value: getCurrentDate(new Date("1918-01-01")),
        type: "date",
      });

      expect(getDate("2018/1/1")).toEqual({
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
      expect(getDate(" 1918-01-01")).toEqual({
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
      expect(getDate(" 2018-1-1 ")).toEqual({
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
      expect(getDate("  2018/1/1  ")).toEqual({
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
      expect(getDate("18-01-01")).toEqual({
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
      expect(getDate("18/01/01 ")).toEqual({
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
      expect(getDate("12:30")).toEqual({
        info: { hour: 12, minute: 30, second: 0 },
        value: undefined,
        type: "time",
      });

      expect(getDate("00:00")).toEqual({
        info: { hour: 0, minute: 0, second: 0 },
        value: undefined,
        type: "time",
      });
    });

    it("Should parse time with hours, minutes and seconds", () => {
      expect(getDate("12:30:00")).toEqual({
        info: { hour: 12, minute: 30, second: 0 },
        value: undefined,
        type: "time",
      });

      expect(getDate("12:30:32")).toEqual({
        info: { hour: 12, minute: 30, second: 32 },
        value: undefined,
        type: "time",
      });
    });

    it("Should parse time with hours, minutes along with spaces", () => {
      expect(getDate("  12:30")).toEqual({
        info: { hour: 12, minute: 30, second: 0 },
        value: undefined,
        type: "time",
      });

      expect(getDate("00:00  ")).toEqual({
        info: { hour: 0, minute: 0, second: 0 },
        value: undefined,
        type: "time",
      });
    });

    it("Should parse time with hours, minutes and seconds along with spaces", () => {
      expect(getDate(" 12:30:00 ")).toEqual({
        info: { hour: 12, minute: 30, second: 0 },
        value: undefined,
        type: "time",
      });

      expect(getDate("   12:30:32   ")).toEqual({
        info: { hour: 12, minute: 30, second: 32 },
        value: undefined,
        type: "time",
      });
    });
  });

  it("Should parse whole date", () => {
    expect(getDate("2018/12/1 12:30")).toEqual({
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

    expect(getDate("18/12/01 12:30")).toEqual({
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

    expect(getDate("  2018/12/01 12:30:00  ")).toEqual({
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

    expect(getDate("  2018-12-01 12:30:00  ")).toEqual({
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

    expect(getDate("  2018-12-1 12:30:00  ")).toEqual({
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
    expect(getDate("2020-04-04T00:00:00.000Z", "Asia/Shanghai")).toEqual({
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
