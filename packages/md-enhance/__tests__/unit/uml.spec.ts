import { describe, it, expect } from "vitest";
import MarkdownIt from "markdown-it";
import { uml } from "../../src/node/markdown-it/index.js";

describe("uml", () => {
  it("Should render without options", () => {
    const markdownIt = MarkdownIt({ linkify: true }).use(uml);

    expect(
      markdownIt.render(`
@start

abc

@end
    `)
    ).toMatchSnapshot();
  });

  it("Should keep content as is", () => {
    const markdownIt = MarkdownIt({ linkify: true }).use(uml);

    expect(
      markdownIt.render(`
@start

Text with **bold** and \`code\`.

@end
    `)
    ).toMatchSnapshot();
  });

  it("Should render with options", () => {
    const markdownIt = MarkdownIt({ linkify: true }).use(uml, {
      name: "test",
      open: "teststart",
      close: "testend",
      render: (tokens, index): string => {
        const token = tokens[index];
        const { content, info, type } = token;

        return `<Test class="${type}" title="${info}">${content}</Test>`;
      },
    });

    expect(
      markdownIt.render(`
@teststart

abc

def

@testend
`)
    ).toMatchSnapshot();
  });
});
