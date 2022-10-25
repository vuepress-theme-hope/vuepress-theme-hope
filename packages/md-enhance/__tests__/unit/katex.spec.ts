import { describe, it, expect, vi } from "vitest";
import MarkdownIt from "markdown-it";
import { katex } from "../../src/node/markdown-it/index.js";

const markdownIt = MarkdownIt({ linkify: true }).use(katex);
const markdownItHTML = MarkdownIt({ linkify: true }).use(katex, {
  output: "html",
});
const markdownItMathML = MarkdownIt({ linkify: true }).use(katex, {
  output: "mathml",
});
const markdownItWithError = MarkdownIt({ linkify: true }).use(katex, {
  throwOnError: true,
});

const examples = [
  "a=1",
  `\\frac {\\partial^r} {\\partial \\omega^r} \\left(\\frac {y^{\\omega}} {\\omega}\\right) = \\left(\\frac {y^{\\omega}} {\\omega}\\right) \\left\\{(\\log y)^r + \\sum_{i=1}^r \\frac {(-1)^ Ir \\cdots (r-i+1) (\\log y)^{ri}} {\\omega^i} \\right\\}`,
];

describe("inline katex", () => {
  it("Should output htmlAndMathML", () => {
    examples.forEach((example) => {
      expect(markdownIt.render(`$${example}$`)).toMatchSnapshot();
      expect(
        markdownIt.render(`A tex equation $${example}$ inline.`)
      ).toMatchSnapshot();

      expect(markdownIt.render(`$${example}$`)).toMatch(
        /<span class="katex"><span class="katex-mathml"><math .*>[.\n]*<\/math><\/span><span class="katex-html" aria-hidden="true">.*<\/span><\/span>/
      );
      expect(markdownIt.render(`A tex equation $${example}$ inline.`)).toMatch(
        /<span class="katex"><span class="katex-mathml"><math .*>[.\n]*<\/math><\/span><span class="katex-html" aria-hidden="true">.*<\/span><\/span>/
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
        /<span class="katex"><span class="katex-html" aria-hidden="true">.*<\/span><\/span>/
      );
      expect(
        markdownItHTML.render(`A tex equation $${example}$ inline.`)
      ).toMatch(
        /<span class="katex"><span class="katex-html" aria-hidden="true">.*<\/span><\/span>/
      );
    });
  });

  it("Should output MathML", () => {
    examples.forEach((example) => {
      expect(markdownItMathML.render(`$${example}$`)).toMatchSnapshot();
      expect(markdownItMathML.render(`$${example}$`)).toMatch(
        /<span class="katex"><math .*>[.\n]*<\/math><\/span>/
      );
      expect(
        markdownItMathML.render(`A tex equation $${example}$ inline.`)
      ).toMatchSnapshot();
      expect(
        markdownItMathML.render(`A tex equation $${example}$ inline.`)
      ).toMatch(/<span class="katex"><math .*>[.\n]*<\/math><\/span>/);
    });
  });

  it("Should not render error msg when content is wrong", () => {
    expect(markdownIt.render("$\\fra{a}{b}$")).toMatchSnapshot();
  });

  it("Should render error msg when content is wrong", () => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const originalWarn = global.console.warn;

    global.console.warn = vi.fn();

    expect(markdownItWithError.render("$\\fra{a}{b}$")).toEqual(
      "<p><span class='katex-error' title='ParseError: KaTeX parse error: Undefined control sequence: \\fra at position 1: \\̲f̲r̲a̲{a}{b}'>\\fra{a}{b}</span></p>\n"
    );

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(global.console.warn).toHaveBeenCalledTimes(1);
    global.console.warn = originalWarn;
  });
});

describe("block katex", () => {
  it("Should output htmlAndMathML", () => {
    examples.forEach((example) => {
      expect(markdownIt.render(`$$${example}$$`)).toMatchSnapshot();
      expect(markdownIt.render(`$$\n${example}\n$$`)).toMatchSnapshot();

      expect(markdownIt.render(`$$${example}$$`)).toMatch(
        /<p class='katex-block'><span class="katex-display"><span class="katex"><span class="katex-mathml"><math .*>[\s\S]*<\/math><\/span><span class="katex-html" aria-hidden="true">.*<\/span><\/span><\/span><\/p>/
      );
      expect(markdownIt.render(`$$\n${example}\n$$`)).toMatch(
        /<p class='katex-block'><span class="katex-display"><span class="katex"><span class="katex-mathml"><math .*>[\s\S]*<\/math><\/span><span class="katex-html" aria-hidden="true">.*<\/span><\/span><\/span><\/p>/
      );
    });
  });

  it("Should output HTML", () => {
    examples.forEach((example) => {
      expect(markdownItHTML.render(`$$${example}$$`)).toMatchSnapshot();
      expect(markdownItHTML.render(`$$\n${example}\n$$`)).toMatchSnapshot();

      expect(markdownItHTML.render(`$$${example}$$`)).toMatch(
        /<p class='katex-block'><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true">.*<\/span><\/span><\/span><\/p>/
      );
      expect(markdownItHTML.render(`$$\n${example}\n$$`)).toMatch(
        /<p class='katex-block'><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true">.*<\/span><\/span><\/span><\/p>/
      );
    });
  });

  it("Should output MathML", () => {
    examples.forEach((example) => {
      expect(markdownItMathML.render(`$$${example}$$`)).toMatchSnapshot();
      expect(markdownItMathML.render(`$$${example}$$`)).toMatch(
        /<p class='katex-block'><span class="katex"><math .*>[\s\S]*<\/math><\/span><\/p>/
      );
      expect(markdownItMathML.render(`$$\n${example}\n$$`)).toMatchSnapshot();
      expect(markdownItMathML.render(`$$\n${example}\n$$`)).toMatch(
        /<p class='katex-block'><span class="katex"><math .*>[\s\S]*<\/math><\/span><\/p>/
      );
    });
  });

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

  it("Should render error msg when content is wrong", () => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const originalWarn = global.console.warn;

    global.console.warn = vi.fn();
    expect(markdownItWithError.render("$$\\fra{a}{b}$$")).toMatch(
      /<p class='katex-block katex-error' title='[\s\S]*?'>[\s\S]*?<\/p>/
    );

    expect(
      markdownItWithError.render(`
$$
\\fra{a}{b}
$$
`)
    ).toMatch(
      /<p class='katex-block katex-error' title='[\s\S]*?'>[\s\S]*?<\/p>/
    );

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(global.console.warn).toHaveBeenCalledTimes(2);
    global.console.warn = originalWarn;
  });
});
