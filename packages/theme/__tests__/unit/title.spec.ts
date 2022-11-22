import { describe, it, expect } from "vitest";

import { getTitle } from "../../src/node/prepare/index.js";

describe("should get correct title from dirname", () => {
  it("Should convert underscore and minus to spaces", () => {
    expect(getTitle("a-nice-tool")).toEqual("A Nice Tool");
    expect(getTitle("a-piece-of-love")).toEqual("A Piece of Love");
  });

  it("Should resolve camelCase filename", () => {
    expect(getTitle("aNiceTool")).toEqual("A Nice Tool");
    expect(getTitle("aPieceOfLove")).toEqual("A Piece of Love");
  });
});
