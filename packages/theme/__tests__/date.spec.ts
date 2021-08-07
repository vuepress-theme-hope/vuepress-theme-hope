// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { compareDate, getDate } from "../utils/article.ts";

describe("Date Test", () => {
  describe("getDate()", () => {
    describe("should parse day", () => {
      it("date string", () => {
        expect(getDate("2020-04-04T00:00:00.000Z")).toEqual([
          2020,
          4,
          4,
          undefined,
          undefined,
          undefined,
        ]);
      });

      it("date", () => {
        expect(getDate("1918-01-01")).toEqual([
          1918,
          1,
          1,
          undefined,
          undefined,
          undefined,
        ]);
      });

      it("simple date like string", () => {
        expect(getDate("2018-1-1")).toEqual([
          2018,
          1,
          1,
          undefined,
          undefined,
          undefined,
        ]);
      });

      it("date like string with splash", () => {
        expect(getDate("1918/01/01")).toEqual([
          1918,
          1,
          1,
          undefined,
          undefined,
          undefined,
        ]);
        expect(getDate("2018/1/1")).toEqual([
          2018,
          1,
          1,
          undefined,
          undefined,
          undefined,
        ]);
      });

      it("date string with spaces", () => {
        expect(getDate(" 1918-01-01")).toEqual([
          1918,
          1,
          1,
          undefined,
          undefined,
          undefined,
        ]);
      });

      it("date like string with spaces", () => {
        expect(getDate(" 2018-1-1 ")).toEqual([
          2018,
          1,
          1,
          undefined,
          undefined,
          undefined,
        ]);
      });

      it("date like string with splash and spaces", () => {
        expect(getDate("  2018/1/1  ")).toEqual([
          2018,
          1,
          1,
          undefined,
          undefined,
          undefined,
        ]);
      });

      it("date like string with spaces and short year", () => {
        expect(getDate("18-01-01")).toEqual([
          2018,
          1,
          1,
          undefined,
          undefined,
          undefined,
        ]);
      });

      it("date like string with splash and spaces and short year", () => {
        expect(getDate("18/01/01 ")).toEqual([
          2018,
          1,
          1,
          undefined,
          undefined,
          undefined,
        ]);
      });
    });

    describe("should parse time", () => {
      it("should parse time with hours and minutes", () => {
        expect(getDate("12:30")).toEqual([
          undefined,
          undefined,
          undefined,
          12,
          30,
          0,
        ]);
        expect(getDate("00:00")).toEqual([
          undefined,
          undefined,
          undefined,
          0,
          0,
          0,
        ]);
      });

      it("should parse time with hours, minutes and seconds", () => {
        expect(getDate("12:30:00")).toEqual([
          undefined,
          undefined,
          undefined,
          12,
          30,
          0,
        ]);
        expect(getDate("12:30:32")).toEqual([
          undefined,
          undefined,
          undefined,
          12,
          30,
          32,
        ]);
      });

      it("should parse time with hours, minutes along with spaces", () => {
        expect(getDate("  12:30")).toEqual([
          undefined,
          undefined,
          undefined,
          12,
          30,
          0,
        ]);

        expect(getDate("00:00  ")).toEqual([
          undefined,
          undefined,
          undefined,
          0,
          0,
          0,
        ]);
      });

      it("should parse time with hours, minutes and seconds along with spaces", () => {
        expect(getDate(" 12:30:00 ")).toEqual([
          undefined,
          undefined,
          undefined,
          12,
          30,
          0,
        ]);
        expect(getDate("   12:30:32   ")).toEqual([
          undefined,
          undefined,
          undefined,
          12,
          30,
          32,
        ]);
      });
    });

    it("should parse whole date", () => {
      expect(getDate("2018/12/1 12:30")).toEqual([2018, 12, 1, 12, 30, 0]);

      expect(getDate("18/12/01 12:30")).toEqual([2018, 12, 1, 12, 30, 0]);

      expect(getDate("  2018/12/01 12:30:00  ")).toEqual([
        2018, 12, 1, 12, 30, 0,
      ]);

      expect(getDate("  2018-12-01 12:30:00  ")).toEqual([
        2018, 12, 1, 12, 30, 0,
      ]);

      expect(getDate("  2018-12-1 12:30:00  ")).toEqual([
        2018, 12, 1, 12, 30, 0,
      ]);
    });
  });

  it("compareDate()", () => {
    expect(compareDate("  2018/12/01 12:30:00  ", "12:30:32")).toBeLessThan(0);

    expect(
      compareDate("  2018/12/01 12:30:00  ", " 2019/12/01  12:30:32")
    ).toBeGreaterThan(0);

    expect(
      compareDate("2019-11-21T00:00:00.000Z", "2020-04-04T00:00:00.000Z")
    ).toBeGreaterThan(0);

    expect(compareDate("2020/1/1", "2020-04-04T00:00:00.000Z")).toBeGreaterThan(
      0
    );

    expect(compareDate("  2018/01/01 12:30  ", "2018/1/1  12:30")).toEqual(0);
  });
});
