import { describe, it, expect } from "vitest";
import MarkdownIt from "markdown-it";
import { sup } from "../../src/node/markdown-it/index.js";

describe("superscript", () => {
  const markdownIt = MarkdownIt({ linkify: true }).use(sup);

  it("Should render", () => {
    expect(markdownIt.render(`^test^`)).toEqual("<p><sup>test</sup></p>\n");
  });

  it("Should not render when escape", () => {
    expect(markdownIt.render(`^foo\\^`)).toEqual("<p>^foo^</p>\n");
    expect(markdownIt.render(`\\^foo^`)).toEqual("<p>^foo^</p>\n");
  });

  it("Should not render when having spaces", () => {
    expect(markdownIt.render(`2^4 + 3^5`)).toEqual("<p>2^4 + 3^5</p>\n");
  });

  it("Should render when spaces are escaped", () => {
    expect(markdownIt.render(`^foo\\ bar\\ baz^`)).toEqual(
      "<p><sup>foo bar baz</sup></p>\n"
    );
    expect(markdownIt.render(`^\\ foo\\ ^`)).toEqual(
      "<p><sup> foo </sup></p>\n"
    );
  });

  it("Should render when having other symbols", () => {
    expect(markdownIt.render(`^foo~bar^baz^bar~foo^`)).toEqual(
      "<p><sup>foo~bar</sup>baz<sup>bar~foo</sup></p>\n"
    );
  });

  it("Should handle multiple '\\'", () => {
    expect(markdownIt.render(`^foo\\\\\\\\\\\\\\ bar^`)).toEqual(
      "<p><sup>foo\\\\\\ bar</sup></p>\n"
    );
    expect(markdownIt.render(`^foo\\\\\\\\\\\\ bar^`)).toEqual(
      "<p>^foo\\\\\\ bar^</p>\n"
    );
  });

  it("Should work with other marker", () => {
    expect(markdownIt.render(`**^foo^ bar**`)).toEqual(
      "<p><strong><sup>foo</sup> bar</strong></p>\n"
    );

    expect(markdownIt.render(`*^f`)).toEqual("<p>*^f</p>\n");

    expect(markdownIt.render(`b*^`)).toEqual("<p>b*^</p>\n");
  });
});
