import { describe, it, expect } from "vitest";
import MarkdownIt from "markdown-it";
import { imageLazyload } from "../../src/node/markdown-it/index.js";

describe("image lazyLoad", () => {
  const markdownIt = MarkdownIt({ linkify: true }).use(imageLazyload);

  it("Should render", () => {
    expect(markdownIt.render(`![image](/logo.svg)`)).toEqual(
      '<p><img src="/logo.svg" alt="image" loading="lazy"></p>\n'
    );
  });
});
