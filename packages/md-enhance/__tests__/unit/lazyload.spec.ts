import { describe, it, expect } from "vitest";
import MarkdownIt from "markdown-it";
import { lazyLoad } from "../../src/node/markdown-it/lazyLoad";

describe("lazyLoad", () => {
  const markdownIt = MarkdownIt({ linkify: true }).use(lazyLoad);

  it("Shoud render", () => {
    expect(markdownIt.render(`![image](/logo.svg)`)).toEqual(
      '<p><img src="/logo.svg" alt="image" loading="lazy"></p>\n'
    );
  });
});
