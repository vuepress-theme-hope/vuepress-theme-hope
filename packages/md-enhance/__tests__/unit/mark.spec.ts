import { describe, it, expect } from "vitest";
import MarkdownIt from "markdown-it";
import { mark } from "../../src/node/markdown-it/index.js";

describe("mark", () => {
  const markdownIt = MarkdownIt({ linkify: true }).use(mark);

  it("Should render", () => {
    expect(markdownIt.render(`==Mark==`)).toEqual("<p><mark>Mark</mark></p>\n");
  });

  it("Can nested", () => {
    expect(markdownIt.render(`x ====foo== bar==`)).toEqual(
      "<p>x <mark><mark>foo</mark> bar</mark></p>\n"
    );
    expect(markdownIt.render(`x ==foo ==bar====`)).toEqual(
      "<p>x <mark>foo <mark>bar</mark></mark></p>\n"
    );
    expect(markdownIt.render(`x ====foo====`)).toEqual(
      "<p>x <mark><mark>foo</mark></mark></p>\n"
    );
    expect(markdownIt.render(`==foo ==bar== baz==`)).toEqual(
      "<p><mark>foo <mark>bar</mark> baz</mark></p>\n"
    );
    expect(markdownIt.render(`==f **o ==o b== a** r==`)).toEqual(
      "<p><mark>f <strong>o <mark>o b</mark> a</strong> r</mark></p>\n"
    );
  });

  it("Should handle multiple '='", () => {
    expect(markdownIt.render(`x ===foo===`)).toEqual(
      "<p>x =<mark>foo</mark>=</p>\n"
    );
  });

  it("Have the same priority as emphases", () => {
    expect(markdownIt.render(`**==test**==`)).toEqual(
      "<p><strong>==test</strong>==</p>\n"
    );
    expect(markdownIt.render(`==**test==**`)).toEqual(
      "<p><mark>**test</mark>**</p>\n"
    );
  });

  it("Have the same priority as emphases with respect to links", () => {
    expect(markdownIt.render(`[==link]()==`)).toEqual(
      `<p><a href="">==link</a>==</p>\n`
    );
    expect(markdownIt.render(`==[link==]()`)).toEqual(
      `<p>==<a href="">link==</a></p>\n`
    );
  });

  it("Have the same priority as emphases with respect to backticks", () => {
    expect(markdownIt.render("==`code==`")).toEqual(
      `<p>==<code>code==</code></p>\n`
    );
    expect(markdownIt.render("` == code`==")).toEqual(
      `<p><code> == code</code>==</p>\n`
    );
  });

  it("Should not render a whitespace or newline between text and '=='", () => {
    expect(markdownIt.render("foo == bar == baz")).toEqual(
      `<p>foo == bar == baz</p>\n`
    );

    expect(
      markdownIt.render(`
==test
== a
`)
    ).toEqual(`<p>==test
== a</p>\n`);

    expect(
      markdownIt.render(`
==
test==
`)
    ).toEqual(`<p>==
test==</p>\n`);

    expect(
      markdownIt.render(`
==
test
==
`)
    ).toEqual(`<h1>==
test</h1>\n`);
  });
});
