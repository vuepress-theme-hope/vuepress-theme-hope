import {
  getChinese,
  getWordNumber,
  getReadingTime,
} from "../../src/node/reading-time";

describe("Reading Time Test", () => {
  it("Words test", () => {
    expect(getChinese("春眠不觉晓，处处闻啼鸟。").length).toEqual(10);

    expect(
      getWordNumber("\n Mr.Hope is handsome, and he is a great man.")
    ).toEqual(9);

    expect(
      getWordNumber(
        "\n Mr.Hope ! is #$%^&* handsome, and %^&* he is a great man."
      )
    ).toEqual(9);

    expect(getWordNumber("春眠^&*(不觉晓，处处闻!#$%啼鸟。")).toEqual(10);

    expect(
      getWordNumber(
        "  春眠不觉晓，处处闻啼鸟。\n   Mr.Hope is handsome, and he is a great man."
      )
    ).toEqual(19);
  });

  it("Reading Time", () => {
    expect(
      getReadingTime(
        "\n Mr.Hope ! is #$%^&* handsome, and %^&* he is a great man."
      )
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
        "  春眠不觉晓，处处闻啼鸟。\n   Mr.Hope is handsome, and he is a great man."
      )
    ).toEqual({
      minutes: 0.06,
      words: 19,
    });

    expect(
      getReadingTime(
        "\n  春眠不觉晓，处处闻啼鸟。\n   Mr.Hope is handsome, and he is a great man.\n  春眠不觉晓，处处闻啼鸟。\n   Mr.Hope is handsome, and he is a great man.\n  春眠不觉晓，处处闻啼鸟。\n   Mr.Hope is handsome, and he is a great man.\n  春眠不觉晓，处处闻啼鸟。\n   Mr.Hope is handsome, and he is a great man.\n  春眠不觉晓，处处闻啼鸟。\n   Mr.Hope is handsome, and he is a great man.\n  春眠不觉晓，处处闻啼鸟。\n   Mr.Hope is handsome, and he is a great man.\n  春眠不觉晓，处处闻啼鸟。\n   Mr.Hope is handsome, and he is a great man."
      )
    ).toEqual({
      minutes: 0.44,
      words: 133,
    });
  });
});
