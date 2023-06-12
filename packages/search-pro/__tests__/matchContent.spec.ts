import { describe, expect, it } from "vitest";

import { getMatchedContent } from "../src/client/worker/matchContent.js";

describe("matchContent", () => {
  it("Should match content", () => {
    expect(getMatchedContent("a b c d", "a")).toEqual([
      ["mark", "a"],
      " b c d",
    ]);
    expect(getMatchedContent("a b c d", "b")).toEqual([
      "a ",
      ["mark", "b"],
      " c d",
    ]);
    expect(getMatchedContent("apple banana cherry", "banana")).toEqual([
      "apple ",
      ["mark", "banana"],
      " cherry",
    ]);
  });

  it("Should return null if no content is matched", () => {
    expect(getMatchedContent("b c d", "a")).toEqual(null);
  });

  it("Should match content multiple times", () => {
    expect(getMatchedContent("a b c d c b a", "b")).toEqual([
      "a ",
      ["mark", "b"],
      " c d c ",
      ["mark", "b"],
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
      ["mark", "apple"],
      " is red, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee… ",
    ]);

    expect(
      getMatchedContent(
        "The apple is red, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious. The banana is yellow, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious",
        "is"
      )
    ).toEqual([
      "The apple ",
      ["mark", "is"],
      " red, and it's veeee … licious. The banana ",
      ["mark", "is"],
      " yellow, and it's veeeeeeeeeeeeeeeeeeeeeeee… ",
    ]);

    expect(
      getMatchedContent(
        "The apple is red, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious. The banana is yellow, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious",
        "The"
      )
    ).toEqual([
      ["mark", "The"],
      " apple is red, and i … eeeeeery delicious. ",
      ["mark", "The"],
      " banana is yellow, and it's veeeeeeeeeeeeeeeeeeeeee… ",
    ]);

    expect(
      getMatchedContent(
        "The apple is red, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious. The banana is yellow, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious",
        "delicious"
      )
    ).toEqual([
      "… eeeeeeeeeeeeeeeeery ",
      ["mark", "delicious"],
      ". The banana is yell … eeeeeeeeeeeeeeeeery ",
      ["mark", "delicious"],
    ]);

    expect(
      getMatchedContent(
        "The apple is red, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious. The banana is yellow, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious",
        "T"
      )
    ).toEqual([
      ["mark", "T"],
      "he apple is red, and …  apple is red, and i",
      ["mark", "T"],
      "'s veeeeeeeeeeeeeeee … eeeeeery delicious. ",
      ["mark", "T"],
      "he banana is yellow, … ana is yellow, and i",
      ["mark", "T"],
      " …",
    ]);

    expect(
      getMatchedContent(
        "The apple is red, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious. The banana is yellow, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious",
        "h"
      )
    ).toEqual([
      "T",
      ["mark", "h"],
      "e apple is red, and  … eeeeery delicious. T",
      ["mark", "h"],
      "e banana is yellow, and it's veeeeeeeeeeeeeeeeeeeeeeee… ",
    ]);

    expect(
      getMatchedContent(
        "The apple is red, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious. The banana is yellow, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious",
        "Th"
      )
    ).toEqual([
      ["mark", "Th"],
      "e apple is red, and  … eeeeeery delicious. ",
      ["mark", "Th"],
      "e banana is yellow, and it's veeeeeeeeeeeeeeeeeeeeeee… ",
    ]);

    expect(
      getMatchedContent(
        "The apple is red, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious. The banana is yellow, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious",
        "e"
      )
    ).toEqual([
      "Th",
      ["mark", "e"],
      " appl",
      ["mark", "e"],
      " is r",
      ["mark", "e"],
      "d, and it's v",
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      ["mark", "e"],
      " …",
      ["mark", "e"],
      " …",
    ]);

    expect(
      getMatchedContent(
        "The apple is red, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious. The banana is yellow, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious",
        "s"
      )
    ).toEqual([
      "The apple i",
      ["mark", "s"],
      " red, and it'",
      ["mark", "s"],
      " veeeeeeeeeeeeeeeeee … eeeeeeeeery deliciou",
      ["mark", "s"],
      ". The banana i",
      ["mark", "s"],
      " yellow, and it'",
      ["mark", "s"],
      " …",
    ]);

    expect(
      getMatchedContent(
        "The apple is red, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious. The banana is yellow, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious",
        "u"
      )
    ).toEqual([
      "… eeeeeeeeeery delicio",
      ["mark", "u"],
      "s. The banana is yel … eeeeeeeeeery delicio",
      ["mark", "u"],
      "s",
    ]);

    expect(
      getMatchedContent(
        "The apple is red, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious. The banana is yellow, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious",
        "us"
      )
    ).toEqual([
      "… eeeeeeeeeery delicio",
      ["mark", "us"],
      ". The banana is yell … eeeeeeeeeery delicio",
      ["mark", "us"],
    ]);
  });
});
