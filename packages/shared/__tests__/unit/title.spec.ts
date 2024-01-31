import { describe, expect, it } from "vitest";

import { getTitleFromFilename } from "../../src/node/utils/title.js";

describe("should get correct title from filename", () => {
  it("Should convert underscore and minus to spaces", () => {
    expect(getTitleFromFilename("a-nice-tool")).toEqual("A Nice Tool");
    expect(getTitleFromFilename("a-piece-of-love")).toEqual("A Piece of Love");
  });

  it("Should resolve camelCase filename", () => {
    expect(getTitleFromFilename("aNiceTool")).toEqual("A Nice Tool");
    expect(getTitleFromFilename("aPieceOfLove")).toEqual("A Piece of Love");
  });

  it("Should omit abbr", () => {
    expect(getTitleFromFilename("HTML and CSS")).toEqual("HTML and CSS");
  });
});
