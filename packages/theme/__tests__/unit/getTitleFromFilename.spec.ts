import { describe, expect, it } from "vitest";

import { getTitleFromFilename } from "../../src/node/prepare/sidebar/getTitleFromFilename.js";

describe(getTitleFromFilename, () => {
  it("should convert underscore and minus to spaces", () => {
    expect(getTitleFromFilename("a-nice-tool")).toBe("A Nice Tool");
    expect(getTitleFromFilename("a-piece-of-love")).toBe("A Piece of Love");
  });

  it("should resolve camelCase filename", () => {
    expect(getTitleFromFilename("aNiceTool")).toBe("A Nice Tool");
    expect(getTitleFromFilename("aPieceOfLove")).toBe("A Piece of Love");
  });

  it("should omit abbr", () => {
    expect(getTitleFromFilename("HTML and CSS")).toBe("HTML and CSS");
  });
});
