import { it, expect } from "vitest";
import MarkdownIt from "markdown-it";
import { imageTitle } from "../../src/node/markdown-it/index.js";

it("Image Title", () => {
  const markdownIt = MarkdownIt({ linkify: true }).use(imageTitle);

  expect(markdownIt.render(`![image](/logo.svg)`)).toEqual(
    '<p><img src="/logo.svg" alt="image"></p>\n'
  );

  expect(markdownIt.render(`![image](/logo.svg "A image")`)).toEqual(
    '<p><figure><img src="/logo.svg" alt="image" title="A image"><figcaption>A image</figcaption></figure></p>\n'
  );
});
