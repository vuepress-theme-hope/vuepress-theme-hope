import { describe, expect, it } from "vitest";

import { timeTransformer } from "../../src/node/utils/date.js";

describe("timeTransformer", () => {
  describe("Should parse day", () => {
    it("date string", () => {
      expect(
        timeTransformer("2020-04-04T00:00:00.000Z", {
          timezone: "Asia/Shanghai",
        }),
      ).toEqual("April 4, 2020 8:00 AM");

      expect(
        timeTransformer("2020-04-04T00:00:00.000Z", {
          timezone: "UTC",
          type: "date",
        }),
      ).toEqual("April 4, 2020");

      expect(
        timeTransformer("2020-04-04T00:00:00.000Z", {
          timezone: "Asia/shanghai",
          type: "time",
        }),
      ).toEqual("08:00");
    });

    it("date", () => {
      expect(timeTransformer("1918-01-01")).toEqual("January 1, 1918");
    });

    it("simple date like string", () => {
      expect(timeTransformer("2018-1-1")).toEqual("January 1, 2018");
    });

    it("date like string with splash", () => {
      expect(timeTransformer("1918/01/01")).toEqual("January 1, 1918");

      expect(timeTransformer("2018/1/1")).toEqual("January 1, 2018");
    });

    it("date string with spaces", () => {
      expect(timeTransformer(" 1918-01-01")).toEqual("January 1, 1918");
    });

    it("date like string with spaces", () => {
      expect(timeTransformer(" 2018-1-1 ")).toEqual("January 1, 2018");
    });

    it("date like string with splash and spaces", () => {
      expect(timeTransformer("  2018/1/1  ")).toEqual("January 1, 2018");
    });

    it("date like string with spaces and short year", () => {
      expect(timeTransformer("18-01-01")).toEqual("January 1, 2018");
    });

    it("date like string with splash and spaces and short year", () => {
      expect(timeTransformer("18/01/01 ")).toEqual("January 1, 2018");
    });
  });

  it("Should parse whole date", () => {
    expect(timeTransformer("2018/12/1 12:30")).toEqual(
      "December 1, 2018 12:30 PM",
    );

    expect(timeTransformer("18/12/01 12:30")).toEqual(
      "December 1, 2018 12:30 PM",
    );

    expect(timeTransformer("  2018/12/01 12:30:00  ")).toEqual(
      "December 1, 2018 12:30 PM",
    );

    expect(timeTransformer("  2018-12-01 12:30:00  ")).toEqual(
      "December 1, 2018 12:30 PM",
    );

    expect(timeTransformer("  2018-12-1 12:30:00  ")).toEqual(
      "December 1, 2018 12:30 PM",
    );
  });

  it("Should handle language", () => {
    expect(
      timeTransformer("2020-04-04T00:00:00.000Z", {
        timezone: "Asia/Shanghai",
        lang: "zh-CN",
      }),
    ).toEqual("2020年4月4日早上8点00分");
  });
});
