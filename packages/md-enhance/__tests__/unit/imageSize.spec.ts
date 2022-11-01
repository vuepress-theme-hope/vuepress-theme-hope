import { describe, it, expect } from "vitest";
import MarkdownIt from "markdown-it";
import { imageSize } from "../../src/node/markdown-it/index.js";

describe("Image Size", () => {
  const markdownIt = MarkdownIt({ linkify: true }).use(imageSize);

  it("Should render", () => {
    expect(markdownIt.render(`![image](/logo.svg)`)).toEqual(
      '<p><img src="/logo.svg" alt="image"></p>\n'
    );

    expect(markdownIt.render(`![image](/logo.svg =200x300)`)).toEqual(
      '<p><img src="/logo.svg" alt="image" width="200" height="300"></p>\n'
    );

    expect(markdownIt.render(`![image](/logo.svg =200x)`)).toEqual(
      '<p><img src="/logo.svg" alt="image" width="200"></p>\n'
    );

    expect(markdownIt.render(`![image](/logo.svg =x300)`)).toEqual(
      '<p><img src="/logo.svg" alt="image" height="300"></p>\n'
    );
  });

  it("Should not render", () => {
    expect(markdownIt.render(`![image](/logo.svg =abcxdef)`)).toEqual(
      "<p>![image](/logo.svg =abcxdef)</p>\n"
    );

    expect(markdownIt.render(`![image](/logo.svg =abcx100)`)).toEqual(
      "<p>![image](/logo.svg =abcx100)</p>\n"
    );

    expect(markdownIt.render(`![image](/logo.svg =200xdef)`)).toEqual(
      "<p>![image](/logo.svg =200xdef)</p>\n"
    );

    expect(markdownIt.render(`![image](/logo.svg =12ax300)`)).toEqual(
      "<p>![image](/logo.svg =12ax300)</p>\n"
    );

    expect(markdownIt.render(`![image](/logo.svg =200x12a)`)).toEqual(
      "<p>![image](/logo.svg =200x12a)</p>\n"
    );

    expect(markdownIt.render(`![image](/logo.svg =200X300)`)).toEqual(
      "<p>![image](/logo.svg =200X300)</p>\n"
    );

    expect(markdownIt.render(`![image](/logo.svg =200×300)`)).toEqual(
      "<p>![image](/logo.svg =200×300)</p>\n"
    );
  });

  it("With title", () => {
    expect(markdownIt.render(`![image](/logo.svg "title")`)).toEqual(
      '<p><img src="/logo.svg" alt="image" title="title"></p>\n'
    );

    expect(markdownIt.render(`![image](/logo.svg "title" =200x300)`)).toEqual(
      '<p><img src="/logo.svg" alt="image" title="title" width="200" height="300"></p>\n'
    );

    expect(markdownIt.render(`![image](/logo.svg "title" =200x)`)).toEqual(
      '<p><img src="/logo.svg" alt="image" title="title" width="200"></p>\n'
    );

    expect(markdownIt.render(`![image](/logo.svg "title" =x300)`)).toEqual(
      '<p><img src="/logo.svg" alt="image" title="title" height="300"></p>\n'
    );
  });
});
