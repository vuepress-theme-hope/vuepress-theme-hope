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
  it("should return 0 if both dates are the same", () => {
    const date = new Date("2022-01-01");

    expect(compareDate(date, date)).toBe(0);

    expect(
      compareDate(
        new Date("2020-04-04T00:00:00.000Z"),
        new Date("2020-04-04T00:00:00.000Z"),
      ),
    ).toBe(0);
  });

  it("should return a positive number if dateA is older than dateB", () => {
    const dateA = new Date("2022-01-01");
    const dateB = new Date("2022-01-02");

    expect(compareDate(dateA, dateB)).toBeGreaterThan(0);

    expect(
      compareDate(
        new Date("2020-04-04T00:00:00.000Z"),
        new Date("2020-05-05T00:00:00.000Z"),
      ),
    ).toBeGreaterThan(0);
  });

  it("should return a negative number if dateA is newer than dateB", () => {
    const dateA = new Date("2022-01-02");
    const dateB = new Date("2022-01-01");

    expect(compareDate(dateA, dateB)).toBeLessThan(0);
    expect(
      compareDate(
        new Date("2020-05-05T00:00:00.000Z"),
        new Date("2020-04-04T00:00:00.000Z"),
      ),
    ).toBeLessThan(0);
  });

  it("should return 1 if dateA is undefined", () => {
    const dateB = new Date("2022-01-01");

    expect(compareDate(undefined, dateB)).toBe(1);
  });

  it("should return -1 if dateB is undefined", () => {
    const dateA = new Date("2022-01-01");

    expect(compareDate(dateA, undefined)).toBe(-1);
  });

  it("should return 0 if both dates are undefined", () => {
    expect(compareDate(undefined, undefined)).toBe(0);
  });

  it("should be a correct date sorter", () => {
    const dates = [
      "2021-01-01",
      "2022-04-05 08:00:00",
      undefined,
      "04:38:45",
      "19999",
      "2022-03-08",
    ];

    expect(dates.sort(compareDate)).toEqual([
      "2022-04-05 08:00:00",
      "2022-03-08",
      "2021-01-01",
      "19999",
      "04:38:45",
      undefined,
    ]);
  });
});
