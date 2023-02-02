import { describe, expect, it } from "vitest";

import { getMatchedContent } from "../src/client/utils/matchContent";

describe("matchContent", () => {
  it("Should match content", () => {
    expect(getMatchedContent("a b c d", "a")).toEqual([
      ["strong", "a"],
      " b c d",
    ]);
    expect(getMatchedContent("a b c d", "b")).toEqual([
      "a ",
      ["strong", "b"],
      " c d",
    ]);
    expect(getMatchedContent("apple banana cherry", "banana")).toEqual([
      "apple ",
      ["strong", "banana"],
      " cherry",
    ]);
  });

  it("Should return null if no content is matched", () => {
    expect(getMatchedContent("b c d", "a")).toEqual(null);
  });

  it("Should match content multiple times", () => {
    expect(getMatchedContent("a b c d c b a", "b")).toEqual([
      "a ",
      ["strong", "b"],
      " c d c ",
      ["strong", "b"],
      " a",
    ]);
  });

  it("Should cut of long content", () => {
    expect(
      getMatchedContent(
        "The apple is red, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious",
        "apple"
      )
    ).toEqual([
      "The ",
      ["strong", "apple"],
      " is red, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee… ",
    ]);

    expect(
      getMatchedContent(
        "The apple is red, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious. The banana is yellow, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious",
        "is"
      )
    ).toEqual([
      "The apple ",
      ["strong", "is"],
      " red, and it's veeee … licious. The banana ",
      ["strong", "is"],
      " yellow, and it's veeeeeeeeeeeeeeeeeeeeeeee… ",
    ]);

    expect(
      getMatchedContent(
        "The apple is red, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious. The banana is yellow, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious",
        "The"
      )
    ).toEqual([
      ["strong", "The"],
      " apple is red, and i … eeeeeery delicious. ",
      ["strong", "The"],
      " banana is yellow, and it's veeeeeeeeeeeeeeeeeeeeee… ",
    ]);

    expect(
      getMatchedContent(
        "The apple is red, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious. The banana is yellow, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious",
        "delicious"
      )
    ).toEqual([
      "… eeeeeeeeeeeeeeeeery ",
      ["strong", "delicious"],
      ". The banana is yell … eeeeeeeeeeeeeeeeery ",
      ["strong", "delicious"],
    ]);

    expect(
      getMatchedContent(
        "The apple is red, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious. The banana is yellow, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious",
        "T"
      )
    ).toEqual([
      ["strong", "T"],
      "he apple is red, and …  apple is red, and i",
      ["strong", "T"],
      "'s veeeeeeeeeeeeeeee … eeeeeery delicious. ",
      ["strong", "T"],
      "he banana is yellow, … ana is yellow, and i",
      ["strong", "T"],
      " …",
    ]);

    expect(
      getMatchedContent(
        "The apple is red, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious. The banana is yellow, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious",
        "h"
      )
    ).toEqual([
      "T",
      ["strong", "h"],
      "e apple is red, and  … eeeeery delicious. T",
      ["strong", "h"],
      "e banana is yellow, and it's veeeeeeeeeeeeeeeeeeeeeeee… ",
    ]);

    expect(
      getMatchedContent(
        "The apple is red, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious. The banana is yellow, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious",
        "Th"
      )
    ).toEqual([
      ["strong", "Th"],
      "e apple is red, and  … eeeeeery delicious. ",
      ["strong", "Th"],
      "e banana is yellow, and it's veeeeeeeeeeeeeeeeeeeeeee… ",
    ]);

    expect(
      getMatchedContent(
        "The apple is red, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious. The banana is yellow, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious",
        "e"
      )
    ).toEqual([
      "Th",
      ["strong", "e"],
      " appl",
      ["strong", "e"],
      " is r",
      ["strong", "e"],
      "d, and it's v",
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      " …",
      ["strong", "e"],
      " …",
    ]);

    expect(
      getMatchedContent(
        "The apple is red, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious. The banana is yellow, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious",
        "s"
      )
    ).toEqual([
      "The apple i",
      ["strong", "s"],
      " red, and it'",
      ["strong", "s"],
      " veeeeeeeeeeeeeeeeee … eeeeeeeeery deliciou",
      ["strong", "s"],
      ". The banana i",
      ["strong", "s"],
      " yellow, and it'",
      ["strong", "s"],
      " …",
    ]);

    expect(
      getMatchedContent(
        "The apple is red, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious. The banana is yellow, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious",
        "u"
      )
    ).toEqual([
      "… eeeeeeeeeery delicio",
      ["strong", "u"],
      "s. The banana is yel … eeeeeeeeeery delicio",
      ["strong", "u"],
      "s",
    ]);

    expect(
      getMatchedContent(
        "The apple is red, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious. The banana is yellow, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious",
        "us"
      )
    ).toEqual([
      "… eeeeeeeeeery delicio",
      ["strong", "us"],
      ". The banana is yell … eeeeeeeeeery delicio",
      ["strong", "us"],
    ]);
  });
});
