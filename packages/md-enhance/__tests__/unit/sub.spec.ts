import MarkdownIt = require("markdown-it");
import sub from "../../src/node/markdown-it/sub";

describe("subscript", () => {
  const markdownIt = MarkdownIt({ linkify: true }).use(sub);

  it("Shoud render", () => {
    expect(markdownIt.render(`~test~`)).toEqual("<p><sub>test</sub></p>\n");
  });

  it("Should not render when escape", () => {
    expect(markdownIt.render(`~foo\\~`)).toEqual("<p>~foo~</p>\n");
    expect(markdownIt.render(`\\~foo~`)).toEqual("<p>~foo~</p>\n");
  });

  it("Should not render when having spaces", () => {
    expect(markdownIt.render(`~foo bar~`)).toEqual("<p>~foo bar~</p>\n");
  });

  it("Shoud render when spcaes are escpaed", () => {
    expect(markdownIt.render(`~foo\\ bar\\ baz~`)).toEqual(
      "<p><sub>foo bar baz</sub></p>\n"
    );
    expect(markdownIt.render(`~\\ foo\\ ~`)).toEqual(
      "<p><sub> foo </sub></p>\n"
    );
  });

  it("Should handle mutiple '\\'", () => {
    expect(markdownIt.render(`~foo\\\\\\\\\\ bar~`)).toEqual(
      "<p><sub>foo\\\\ bar</sub></p>\n"
    );
    expect(markdownIt.render(`~foo\\\\\\\\ bar~`)).toEqual(
      "<p>~foo\\\\ bar~</p>\n"
    );
  });

  it("Should work with other marker", () => {
    expect(markdownIt.render(`**~foo~ bar**`)).toEqual(
      "<p><strong><sub>foo</sub> bar</strong></p>\n"
    );

    expect(markdownIt.render(`*~f`)).toEqual("<p>*~f</p>\n");
    expect(markdownIt.render(`b*~`)).toEqual("<p>b*~</p>\n");
  });
});
