import { describe, it, expect } from "vitest";
import MarkdownIt from "markdown-it";
import { tex } from "../../src/node/markdown-it/index.js";

const render = (content: string, displayMode: boolean): string =>
  displayMode
    ? `<p>{Tex content: ${content}}</p>`
    : `{Tex content: ${content}}`;

const markdownIt = MarkdownIt({ linkify: true }).use(tex, { render });

describe("inline katex", () => {
  it("Should render", () => {
    expect(markdownIt.render(`$a=1$`)).toEqual("<p>{Tex content: a=1}</p>\n");
    expect(markdownIt.render(`A tex equation $a=1$ inline.`)).toEqual(
      "<p>A tex equation {Tex content: a=1} inline.</p>\n"
    );
  });

  it("Should not render when escape", () => {
    expect(markdownIt.render("$a = 1\\$")).toEqual("<p>$a = 1$</p>\n");
    expect(markdownIt.render("\\$a = 1$")).toEqual("<p>$a = 1$</p>\n");
  });

  it("Should not render when having spaces", () => {
    expect(markdownIt.render(`$ a = 1 $`)).toEqual("<p>$ a = 1 $</p>\n");
  });

  it("Should not render when the first one is after a character", () => {
    expect(markdownIt.render(`The next$a = 1$ won’t work`)).toMatchSnapshot();
  });

  it("Should not render when the ending tag is followed by number", () => {
    expect(markdownIt.render(`Of course $1 = $1`)).toEqual(
      "<p>Of course $1 = $1</p>\n"
    );
  });
});

describe("block katex", () => {
  it("Should render", () => {
    expect(markdownIt.render(`$$a=1$$`)).toEqual(
      "<p>{Tex content: \na=1\n}</p>"
    );

    expect(
      markdownIt.render(`
$$
a = 1 \\\\
b = 2
$$
`)
    ).toEqual("<p>{Tex content: \na = 1 \\\\\nb = 2\n}</p>");
  });

  it("Should not render when escape", () => {
    expect(markdownIt.render("\\$\\$a = 1$$")).toEqual("<p>$$a = 1$$</p>\n");
    expect(
      markdownIt.render(`
\\$\\$
a = 1
\\$\\$
`)
    ).toEqual(`<p>$$
a = 1
$$</p>\n`);
  });

  it("Should render when having spaces", () => {
    expect(markdownIt.render(`$$ a = 1 $$`)).toMatchSnapshot();

    expect(markdownIt.render(`All $$ a = 1 $$ is true.`)).toEqual(
      "<p>All $$ a = 1 $$ is true.</p>\n"
    );
  });
});
