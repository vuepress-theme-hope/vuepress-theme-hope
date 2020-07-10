import { describe, it } from "mocha";
import readingTime, { getChinese, getWordNumber } from "../lib/reading-time";
import { expect } from "chai";

describe("Reading Time Test", () => {
  it("Words test", () => {
    expect(getChinese("春眠不觉晓，处处闻啼鸟。").length).to.be.equal(10);

    expect(
      getWordNumber("\n Mr.Hope is handsome, and he is a great man.")
    ).to.be.equal(9);

    expect(
      getWordNumber(
        "\n Mr.Hope ! is #$%^&* handsome, and %^&* he is a great man."
      )
    ).to.be.equal(9);

    expect(getWordNumber("春眠^&*(不觉晓，处处闻!#$%啼鸟。")).to.be.equal(10);

    expect(
      getWordNumber(
        "  春眠不觉晓，处处闻啼鸟。\n   Mr.Hope is handsome, and he is a great man."
      )
    ).to.be.equal(19);
  });

  it("Reading Time", () => {
    expect(
      readingTime(
        "\n Mr.Hope ! is #$%^&* handsome, and %^&* he is a great man."
      )
    ).to.be.deep.equal({
      minutes: 0.03,
      words: 9,
    });

    expect(readingTime("春眠^&*(不觉晓，处处闻!#$%啼鸟。")).to.be.deep.equal({
      minutes: 0.03,
      words: 10,
    });

    expect(
      readingTime(
        "  春眠不觉晓，处处闻啼鸟。\n   Mr.Hope is handsome, and he is a great man."
      )
    ).to.be.deep.equal({
      minutes: 0.06,
      words: 19,
    });

    expect(
      readingTime(
        "\n  春眠不觉晓，处处闻啼鸟。\n   Mr.Hope is handsome, and he is a great man.\n  春眠不觉晓，处处闻啼鸟。\n   Mr.Hope is handsome, and he is a great man.\n  春眠不觉晓，处处闻啼鸟。\n   Mr.Hope is handsome, and he is a great man.\n  春眠不觉晓，处处闻啼鸟。\n   Mr.Hope is handsome, and he is a great man.\n  春眠不觉晓，处处闻啼鸟。\n   Mr.Hope is handsome, and he is a great man.\n  春眠不觉晓，处处闻啼鸟。\n   Mr.Hope is handsome, and he is a great man.\n  春眠不觉晓，处处闻啼鸟。\n   Mr.Hope is handsome, and he is a great man."
      )
    ).to.be.deep.equal({
      minutes: 0.44,
      words: 133,
    });
  });
});
