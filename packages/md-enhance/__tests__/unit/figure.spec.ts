import { describe, it, expect } from "vitest";
import MarkdownIt from "markdown-it";
import { figure } from "../../src/node/markdown-it/index.js";

describe("Figure", () => {
  const markdownIt = MarkdownIt({ linkify: true }).use(figure);

  it("Should use alt it no title is found", () => {
    expect(markdownIt.render(`![image](/logo.svg)`)).toEqual(
      '<figure><img src="/logo.svg" alt="image" tabindex="0"><figcaption>image</figcaption></figure>\n'
    );
  });

  it("Should use title and remove original title on image", () => {
    expect(markdownIt.render(`![image](/logo.svg "A image")`)).toEqual(
      '<figure><img src="/logo.svg" alt="image" tabindex="0"><figcaption>A image</figcaption></figure>\n'
    );
  });

  it("Should not change inline image", () => {
    expect(
      markdownIt.render(`A ![image](/logo.svg "A image") in text`)
    ).toEqual(
      '<p>A <img src="/logo.svg" alt="image" title="A image"> in text</p>\n'
    );
  });

  it("Should support image with links", () => {
    expect(
      markdownIt.render(`[![image](/logo.svg)](https://example.com)`)
    ).toEqual(
      '<figure><a href="https://example.com"><img src="/logo.svg" alt="image" tabindex="0"></a><figcaption>image</figcaption></figure>\n'
    );

    expect(
      markdownIt.render(`[![image](/logo.svg "A image")](https://example.com)`)
    ).toEqual(
      '<figure><a href="https://example.com"><img src="/logo.svg" alt="image" tabindex="0"></a><figcaption>A image</figcaption></figure>\n'
    );
  });
});
