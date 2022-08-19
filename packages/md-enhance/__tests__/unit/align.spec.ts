import { describe, it, expect } from "vitest";
import MarkdownIt from "markdown-it";
import { align } from "../../src/node/markdown-it";

describe("align", () => {
  const markdownIt = MarkdownIt({ linkify: true }).use(align);

  it("should handle left", () => {
    expect(markdownIt.render("::: left\n*content*\n:::\n")).toBe(
      '<div style="text-align:left">\n<p><em>content</em></p>\n</div>\n'
    );
  });

  it("should handle right", () => {
    expect(markdownIt.render("::: right\n*content*\n:::\n")).toBe(
      '<div style="text-align:right">\n<p><em>content</em></p>\n</div>\n'
    );
  });

  it("should handle center", () => {
    expect(markdownIt.render("::: center\n*content*\n:::\n")).toBe(
      '<div style="text-align:center">\n<p><em>content</em></p>\n</div>\n'
    );
  });

  it("should handle justify", () => {
    expect(markdownIt.render("::: justify\n*content*\n:::\n")).toBe(
      '<div style="text-align:justify">\n<p><em>content</em></p>\n</div>\n'
    );
  });
});
