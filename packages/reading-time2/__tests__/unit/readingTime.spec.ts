import { describe, expect, it } from "vitest";

import { getReadingTime, getWordNumber } from "../../src/node/readingTime";

describe("Words test", () => {
  describe("Should handle english", () => {
    it("Should count words", () => {
      expect(
        getWordNumber("\n Mr.Hope is handsome, and he is a great man."),
      ).toEqual(9);
    });

    it("Should ignore marks", () => {
      expect(
        getWordNumber(
          "\n Mr.Hope ! is #$%^&* handsome, and %^&* he is a great man.",
        ),
      ).toEqual(9);
    });
  });

  describe("Should handle chinese", () => {
    it("Should count words", () => {
      expect(getWordNumber("春眠不觉晓，处处闻啼鸟。")).toEqual(10);
    });

    it("Should ignore marks", () => {
      expect(getWordNumber("春眠^&*(不觉晓，处处闻!#$%啼鸟。")).toEqual(10);
    });
  });

  describe("Should handle russian", () => {
    it("Should count words", () => {
      expect(
        getWordNumber("Для меня очень странно было услышать эту причину."),
      ).toEqual(8);
    });

    it("Should ignore marks", () => {
      expect(
        getWordNumber(
          "Для меня очень **странно** [было][] услышать эту причину.",
        ),
      ).toEqual(8);
    });
  });

  describe("Should handle mixed content", () => {
    it("Should count words", () => {
      expect(
        getWordNumber(
          "  春眠不觉晓，处处闻啼鸟。\n   Mr.Hope is handsome, and he is a great man.",
        ),
      ).toEqual(19);
    });

    it("Should ignore marks", () => {
      expect(
        getWordNumber(
          "春眠^&*(不觉晓，处处闻!#$%啼鸟。\n Mr.Hope ! is #$%^&* handsome, and %^&* he is a great man.",
        ),
      ).toEqual(19);
    });
  });
});

describe("Reading Time Test", () => {
  it("Reading Time", () => {
    expect(
      getReadingTime(
        "\n Mr.Hope ! is #$%^&* handsome, and %^&* he is a great man.",
      ),
    ).toEqual({
      minutes: 0.03,
      words: 9,
    });

    expect(getReadingTime("春眠^&*(不觉晓，处处闻!#$%啼鸟。")).toEqual({
      minutes: 0.03,
      words: 10,
    });

    expect(
      getReadingTime(
        "  春眠不觉晓，处处闻啼鸟。\n   Mr.Hope is handsome, and he is a great man.",
      ),
    ).toEqual({
      minutes: 0.06,
      words: 19,
    });

    expect(
      getReadingTime(
        "\n  春眠不觉晓，处处闻啼鸟。\n   Mr.Hope is handsome, and he is a great man.\n  春眠不觉晓，处处闻啼鸟。\n   Mr.Hope is handsome, and he is a great man.\n  春眠不觉晓，处处闻啼鸟。\n   Mr.Hope is handsome, and he is a great man.\n  春眠不觉晓，处处闻啼鸟。\n   Mr.Hope is handsome, and he is a great man.\n  春眠不觉晓，处处闻啼鸟。\n   Mr.Hope is handsome, and he is a great man.\n  春眠不觉晓，处处闻啼鸟。\n   Mr.Hope is handsome, and he is a great man.\n  春眠不觉晓，处处闻啼鸟。\n   Mr.Hope is handsome, and he is a great man.",
      ),
    ).toEqual({
      minutes: 0.44,
      words: 133,
    });
  });
});
