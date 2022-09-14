import { describe, it, expect } from "vitest";
import MarkdownIt from "markdown-it";
import { mathjax } from "../../src/node/markdown-it/index.js";

const markdownIt = MarkdownIt({ linkify: true }).use(mathjax);
const markdownItHTML = MarkdownIt({ linkify: true }).use(mathjax, {
  output: "chtml",
});

const examples = [
  "a=1",
  `\\frac {\\partial^r} {\\partial \\omega^r} \\left(\\frac {y^{\\omega}} {\\omega}\\right) = \\left(\\frac {y^{\\omega}} {\\omega}\\right) \\left\\{(\\log y)^r + \\sum_{i=1}^r \\frac {(-1)^ Ir \\cdots (r-i+1) (\\log y)^{ri}} {\\omega^i} \\right\\}`,
];

describe("inline mathjax", () => {
  it("Should output SVG", () => {
    examples.forEach((example) => {
      expect(markdownIt.render(`$${example}$`)).toMatchSnapshot();
      expect(
        markdownIt.render(`A tex equation $${example}$ inline.`)
      ).toMatchSnapshot();

      expect(markdownIt.render(`$${example}$`)).toMatch(
        /<mjx-container .*><svg .*>[\s\S]*<\/svg><\/mjx-container>/
      );
      expect(markdownIt.render(`A tex equation $${example}$ inline.`)).toMatch(
        /<mjx-container .*><svg .*>[\s\S]*<\/svg><\/mjx-container>/
      );
    });
  });

  it("Should output HTML", () => {
    examples.forEach((example) => {
      expect(markdownItHTML.render(`$${example}$`)).toMatchSnapshot();
      expect(
        markdownItHTML.render(`A tex equation $${example}$ inline.`)
      ).toMatchSnapshot();

      expect(markdownItHTML.render(`$${example}$`)).toMatch(
        /<mjx-container .*><mjx-math .*>[\s\S]*<\/mjx-math><\/mjx-container>/
      );
      expect(
        markdownItHTML.render(`A tex equation $${example}$ inline.`)
      ).toMatch(
        /<mjx-container .*><mjx-math .*>[\s\S]*<\/mjx-math><\/mjx-container>/
      );
    });
  });

  it("Should not render error msg when content is wrong", () => {
    expect(markdownIt.render("$\\fra{a}{b}$")).toMatchSnapshot();
  });
});

describe("block mathjax", () => {
  it("Should not render error msg when content is wrong", () => {
    expect(markdownIt.render("$$\\fra{a}{b}$$")).toMatchSnapshot();

    expect(
      markdownIt.render(`
$$
\\fra{a}{b}
$$
`)
    ).toMatchSnapshot();
  });

  it("Should not output warnings when content has line breaks", () => {
    expect(
      markdownIt.render(`
$$
\\begin{alignedat}{2}
    10&x+ &3&y = 2 \\\\
    3&x+&13&y = 4
\\end{alignedat}
$$    
`)
    ).toMatchSnapshot();
  });
});
