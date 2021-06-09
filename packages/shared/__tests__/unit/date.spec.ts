import { getDate } from "../../src/shared/utils/date";

const getCurrentDate = (date: Date): Date =>
  new Date(date.getTime() + new Date().getTimezoneOffset() * 60 * 1000);

describe("getDate()", () => {
  describe("Should parse day", () => {
    it("date string", () => {
      expect(
        getDate("2020-04-04T00:00:00.000Z", { timezone: "Asia/Shanghai" })
      ).toEqual({
        detail: {
          day: 4,
          hour: 8,
          minute: 0,
          month: 4,
          second: 0,
          year: 2020,
        },
        display: "April 4, 2020 08:00",
        value: new Date("2020-04-04T00:00:00.000Z"),
      });

      expect(
        getDate("2020-04-04T00:00:00.000Z", {
          timezone: "UTC",
          type: "date",
        })
      ).toEqual({
        detail: {
          day: 4,
          month: 4,
          year: 2020,
        },
        display: "April 4, 2020",
        value: new Date("2020-04-04T00:00:00.000Z"),
      });

      expect(
        getDate("2020-04-04T00:00:00.000Z", {
          timezone: "Asia/shanghai",
          type: "time",
        })
      ).toEqual({
        detail: {
          day: 4,
          hour: 8,
          minute: 0,
          month: 4,
          second: 0,
          year: 2020,
        },
        display: "08:00",
        value: new Date("2020-04-04T00:00:00.000Z"),
      });
    });

    it("date", () => {
      expect(getDate("1918-01-01")).toEqual({
        detail: {
          day: 1,
          month: 1,
          year: 1918,
        },
        display: "January 1, 1918",
        value: getCurrentDate(new Date("1918-01-01")),
      });
    });

    it("simple date like string", () => {
      expect(getDate("2018-1-1")).toEqual({
        detail: {
          day: 1,
          month: 1,
          year: 2018,
        },
        display: "January 1, 2018",
        value: getCurrentDate(new Date("2018-01-01")),
      });
    });

    it("date like string with splash", () => {
      expect(getDate("1918/01/01")).toEqual({
        detail: {
          day: 1,
          month: 1,
          year: 1918,
        },
        display: "January 1, 1918",
        value: getCurrentDate(new Date("1918-01-01")),
      });

      expect(getDate("2018/1/1")).toEqual({
        detail: {
          day: 1,
          month: 1,
          year: 2018,
        },
        display: "January 1, 2018",
        value: getCurrentDate(new Date("2018-01-01")),
      });
    });

    it("date string with spaces", () => {
      expect(getDate(" 1918-01-01")).toEqual({
        detail: {
          day: 1,
          month: 1,
          year: 1918,
        },
        display: "January 1, 1918",
        value: getCurrentDate(new Date("1918-01-01")),
      });
    });

    it("date like string with spaces", () => {
      expect(getDate(" 2018-1-1 ")).toEqual({
        detail: {
          day: 1,
          month: 1,
          year: 2018,
        },
        display: "January 1, 2018",
        value: getCurrentDate(new Date("2018-01-01")),
      });
    });

    it("date like string with splash and spaces", () => {
      expect(getDate("  2018/1/1  ")).toEqual({
        detail: {
          day: 1,
          month: 1,
          year: 2018,
        },
        display: "January 1, 2018",
        value: getCurrentDate(new Date("2018-01-01")),
      });
    });

    it("date like string with spaces and short year", () => {
      expect(getDate("18-01-01")).toEqual({
        detail: {
          day: 1,
          month: 1,
          year: 2018,
        },
        display: "January 1, 2018",
        value: getCurrentDate(new Date("2018-01-01")),
      });
    });

    it("date like string with splash and spaces and short year", () => {
      expect(getDate("18/01/01 ")).toEqual({
        detail: {
          day: 1,
          month: 1,
          year: 2018,
        },
        display: "January 1, 2018",
        value: getCurrentDate(new Date("2018-01-01")),
      });
    });
  });

  describe("Should parse time", () => {
    it("Should parse time with hours and minutes", () => {
      expect(getDate("12:30")).toEqual({
        detail: { hour: 12, minute: 30, second: 0 },
        display: "12:30",
        value: undefined,
      });

      expect(getDate("00:00")).toEqual({
        detail: { hour: 0, minute: 0, second: 0 },
        display: "00:00",
        value: undefined,
      });
    });

    it("Should parse time with hours, minutes and seconds", () => {
      expect(getDate("12:30:00")).toEqual({
        detail: { hour: 12, minute: 30, second: 0 },
        display: "12:30",
        value: undefined,
      });

      expect(getDate("12:30:32")).toEqual({
        detail: { hour: 12, minute: 30, second: 32 },
        display: "12:30",
        value: undefined,
      });
    });

    it("Should parse time with hours, minutes along with spaces", () => {
      expect(getDate("  12:30")).toEqual({
        detail: { hour: 12, minute: 30, second: 0 },
        display: "12:30",
        value: undefined,
      });

      expect(getDate("00:00  ")).toEqual({
        detail: { hour: 0, minute: 0, second: 0 },
        display: "00:00",
        value: undefined,
      });
    });

    it("Should parse time with hours, minutes and seconds along with spaces", () => {
      expect(getDate(" 12:30:00 ")).toEqual({
        detail: { hour: 12, minute: 30, second: 0 },
        display: "12:30",
        value: undefined,
      });

      expect(getDate("   12:30:32   ")).toEqual({
        detail: { hour: 12, minute: 30, second: 32 },
        display: "12:30",
        value: undefined,
      });
    });
  });

  it("Should parse whole date", () => {
    expect(getDate("2018/12/1 12:30")).toEqual({
      detail: {
        day: 1,
        hour: 12,
        minute: 30,
        month: 12,
        second: 0,
        year: 2018,
      },
      display: "December 1, 2018 12:30",
      value: new Date("2018-12-01 12:30"),
    });

    expect(getDate("18/12/01 12:30")).toEqual({
      detail: {
        day: 1,
        hour: 12,
        minute: 30,
        month: 12,
        second: 0,
        year: 2018,
      },
      display: "December 1, 2018 12:30",
      value: new Date("2018-12-01 12:30"),
    });

    expect(getDate("  2018/12/01 12:30:00  ")).toEqual({
      detail: {
        day: 1,
        hour: 12,
        minute: 30,
        month: 12,
        second: 0,
        year: 2018,
      },
      display: "December 1, 2018 12:30",
      value: new Date("2018-12-01 12:30"),
    });

    expect(getDate("  2018-12-01 12:30:00  ")).toEqual({
      detail: {
        day: 1,
        hour: 12,
        minute: 30,
        month: 12,
        second: 0,
        year: 2018,
      },
      display: "December 1, 2018 12:30",
      value: new Date("2018-12-01 12:30"),
    });

    expect(getDate("  2018-12-1 12:30:00  ")).toEqual({
      detail: {
        day: 1,
        hour: 12,
        minute: 30,
        month: 12,
        second: 0,
        year: 2018,
      },
      display: "December 1, 2018 12:30",
      value: new Date("2018-12-01 12:30"),
    });
  });

  it("Should handle language", () => {
    expect(
      getDate("2020-04-04T00:00:00.000Z", {
        timezone: "Asia/Shanghai",
        lang: "zh-CN",
      })
    ).toEqual({
      detail: {
        day: 4,
        hour: 8,
        minute: 0,
        month: 4,
        second: 0,
        year: 2020,
      },
      display: "2020年4月4日 08:00",
      value: new Date("2020-04-04T00:00:00.000Z"),
    });
  });
});
