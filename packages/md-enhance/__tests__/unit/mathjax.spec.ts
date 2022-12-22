import { createBaseApp } from "@vuepress/core";
import { path } from "@vuepress/utils";
import MarkdownIt from "markdown-it";
import { describe, it, expect } from "vitest";
import {
  MathJax,
  mathjax,
  initMathjax,
  CHTML,
} from "../../src/node/markdown-it/mathjax.js";

import { emptyTheme } from "./__fixtures__/theme/empty.js";

const examples = [
  "a=1",
  `\\frac {\\partial^r} {\\partial \\omega^r} \\left(\\frac {y^{\\omega}} {\\omega}\\right) = \\left(\\frac {y^{\\omega}} {\\omega}\\right) \\left\\{(\\log y)^r + \\sum_{i=1}^r \\frac {(-1)^ Ir \\cdots (r-i+1) (\\log y)^{ri}} {\\omega^i} \\right\\}`,
];

describe("Inline mathjax", () => {
  it("Should output SVG", () => {
    const markdownIt = MarkdownIt({ linkify: true }).use(
      mathjax,
      initMathjax({})
    );

    examples.forEach((example) => {
      expect(markdownIt.render(`$${example}$`)).toMatchSnapshot();
      expect(
        markdownIt.render(`A tex equation $${example}$ inline.`)
      ).toMatchSnapshot();

      expect(markdownIt.render(`$${example}$`)).toMatch(
        /<svg .*>[\s\S]*<\/svg>/
      );
      expect(markdownIt.render(`$${example}$`)).toMatch(
        /<mjx-container .*>.*<\/mjx-container>/
      );
      expect(markdownIt.render(`A tex equation $${example}$ inline.`)).toMatch(
        /<svg .*>[\s\S]*<\/svg>/
      );
      expect(markdownIt.render(`A tex equation $${example}$ inline.`)).toMatch(
        /<mjx-container .*>.*<\/mjx-container>/
      );
    });
  });

  it("Should output HTML", () => {
    const markdownItHTML = MarkdownIt({ linkify: true }).use(
      mathjax,
      initMathjax({
        output: "chtml",
      })
    );

    examples.forEach((example) => {
      expect(markdownItHTML.render(`$${example}$`)).toMatchSnapshot();
      expect(
        markdownItHTML.render(`A tex equation $${example}$ inline.`)
      ).toMatchSnapshot();

      expect(markdownItHTML.render(`$${example}$`)).toMatch(
        /<mjx-container .*>.*<\/mjx-container>/
      );
      expect(markdownItHTML.render(`$${example}$`)).toMatch(
        /<mjx-math .*>[\s\S]*<\/mjx-math>/
      );

      expect(
        markdownItHTML.render(`A tex equation $${example}$ inline.`)
      ).toMatch(/<mjx-container .*>.*<\/mjx-container>/);
      expect(
        markdownItHTML.render(`A tex equation $${example}$ inline.`)
      ).toMatch(/<mjx-math .*>[\s\S]*<\/mjx-math>/);
    });
  });

  it("Should output A11y", () => {
    const markdownIt = MarkdownIt({ linkify: true }).use(
      mathjax,
      initMathjax({})
    );
    const markdownItHTML = MarkdownIt({ linkify: true }).use(
      mathjax,
      initMathjax({
        output: "chtml",
      })
    );

    examples.forEach((example) => {
      expect(markdownIt.render(`$${example}$`)).toMatch(
        /<mjx-assistive-mml .*>[\s\S]*<\/mjx-assistive-mml>/
      );
      expect(markdownIt.render(`A tex equation $${example}$ inline.`)).toMatch(
        /<mjx-assistive-mml .*>[\s\S]*<\/mjx-assistive-mml>/
      );
      expect(markdownItHTML.render(`$${example}$`)).toMatch(
        /<mjx-assistive-mml .*>[\s\S]*<\/mjx-assistive-mml>/
      );
      expect(
        markdownItHTML.render(`A tex equation $${example}$ inline.`)
      ).toMatch(/<mjx-assistive-mml .*>[\s\S]*<\/mjx-assistive-mml>/);
    });
  });

  it("Should not output A11y", () => {
    const markdownIt = MarkdownIt({ linkify: true }).use(
      mathjax,
      initMathjax({ a11y: false })
    );
    const markdownItHTML = MarkdownIt({ linkify: true }).use(
      mathjax,
      initMathjax({
        a11y: false,
        output: "chtml",
      })
    );

    examples.forEach((example) => {
      expect(markdownIt.render(`$${example}$`)).not.toMatch(
        /<mjx-assistive-mml .*>[\s\S]*<\/mjx-assistive-mml>/
      );
      expect(
        markdownIt.render(`A tex equation $${example}$ inline.`)
      ).not.toMatch(/<mjx-assistive-mml .*>[\s\S]*<\/mjx-assistive-mml>/);
      expect(markdownItHTML.render(`$${example}$`)).not.toMatch(
        /<mjx-assistive-mml .*>[\s\S]*<\/mjx-assistive-mml>/
      );
      expect(
        markdownItHTML.render(`A tex equation $${example}$ inline.`)
      ).not.toMatch(/<mjx-assistive-mml .*>[\s\S]*<\/mjx-assistive-mml>/);
    });
  });

  it("Should not render error msg when content is wrong", () => {
    const markdownIt = MarkdownIt({ linkify: true }).use(
      mathjax,
      initMathjax({})
    );

    expect(markdownIt.render("$\\fra{a}{b}$")).toMatchSnapshot();
  });
});

describe("Block mathjax", () => {
  it("Should output SVG", () => {
    const markdownIt = MarkdownIt({ linkify: true }).use(
      mathjax,
      initMathjax({})
    );

    expect(markdownIt.render("$$\\frac{a}{b}$$")).toMatchSnapshot();

    expect(
      markdownIt.render(`
$$
\\frac{a}{b}
$$
`)
    ).toMatchSnapshot();
  });

  it("Should output HTML", () => {
    const markdownIt = MarkdownIt({ linkify: true }).use(
      mathjax,
      initMathjax({ output: "chtml" })
    );

    expect(markdownIt.render("$$\\frac{a}{b}$$")).toMatchSnapshot();

    expect(
      markdownIt.render(`
$$
\\frac{a}{b}
$$
`)
    ).toMatchSnapshot();
  });

  it("Should not render error msg when content is wrong", () => {
    const markdownIt = MarkdownIt({ linkify: true }).use(
      mathjax,
      initMathjax({})
    );

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
    const markdownIt = MarkdownIt({ linkify: true }).use(
      mathjax,
      initMathjax({})
    );

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

describe("Check generated style", () => {
  describe("Basic sample", () => {
    it("Should generate correct CSS with svg", () => {
      const mathjaxUtils = initMathjax({ output: "svg" })!;
      const markdownIt = MarkdownIt({ linkify: true }).use(
        mathjax,
        mathjaxUtils
      );

      expect(markdownIt.render("$$\\frac{a}{b}$$")).toMatchSnapshot();
    });

    it("Should generate correct CSS with HTML", () => {
      const mathjaxUtils = initMathjax({ output: "chtml" })!;
      const markdownIt = MarkdownIt({ linkify: true }).use(
        mathjax,
        mathjaxUtils
      );
      const { OutputJax } = mathjaxUtils.documentOptions;

      if (OutputJax instanceof CHTML) OutputJax.clearCache();

      expect(markdownIt.render("$$\\frac{a}{b}$$")).toMatchSnapshot("content");

      expect(
        mathjaxUtils.adaptor
          .innerHTML(
            mathjaxUtils.documentOptions.OutputJax.styleSheet(
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              MathJax.document("", mathjaxUtils.documentOptions)
            )
          )
          .split("\n").length
      ).toMatchSnapshot("lines");
    });
  });

  describe("Full example", () => {
    it("Should generate correct css with svg", async () => {
      const mathjaxUtils = initMathjax({ output: "svg" })!;
      const app = createBaseApp({
        bundler: {} as any,
        source: path.resolve(__dirname, "./__fixtures__/src"),
        theme: emptyTheme,
        plugins: [
          {
            name: "test-mathjax",
            extendsMarkdown: (md): void => {
              md.use(mathjax, mathjaxUtils);
            },
          },
        ],
      });

      await app.init();
    });

    it("Should generate correct css with chtml", async () => {
      const mathjaxUtils = initMathjax({ output: "chtml" })!;

      const { OutputJax } = mathjaxUtils.documentOptions;

      if (OutputJax instanceof CHTML) OutputJax.clearCache();

      const app = createBaseApp({
        bundler: {} as any,
        source: path.resolve(__dirname, "./__fixtures__/src"),
        theme: emptyTheme,
        plugins: [
          {
            name: "test-mathjax",
            extendsMarkdown: (md): void => {
              md.use(mathjax, mathjaxUtils);
            },
          },
        ],
      });

      await app.init();

      expect(
        mathjaxUtils.adaptor
          .innerHTML(
            mathjaxUtils.documentOptions.OutputJax.styleSheet(
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              MathJax.document("", mathjaxUtils.documentOptions)
            )
          )
          .split("\n").length
      ).toMatchSnapshot();
    });
  });
});
