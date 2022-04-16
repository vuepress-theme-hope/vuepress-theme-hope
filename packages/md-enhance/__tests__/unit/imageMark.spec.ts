import MarkdownIt = require("markdown-it");
import { imageMark } from "../../src/node/markdown-it/imageMark";

describe("Image Mark", () => {
  const markdownIt = MarkdownIt({ linkify: true }).use(imageMark);
  const markdownItWithCustomOptions = MarkdownIt({ linkify: true }).use(
    imageMark,
    {
      light: ["lightmode"],
      dark: ["darkmode"],
    }
  );

  it("Shoud render", () => {
    expect(markdownIt.render(`![image](/logo.svg)`)).toEqual(
      '<p><img src="/logo.svg" alt="image"></p>\n'
    );

    expect(markdownIt.render(`![image](/logo.svg#gh-light-mode-only)`)).toEqual(
      '<p><img src="/logo.svg" alt="image" data-mode="lightmode-only"></p>\n'
    );

    expect(markdownIt.render(`![image](/logo.svg#gh-dark-mode-only)`)).toEqual(
      '<p><img src="/logo.svg" alt="image" data-mode="darkmode-only"></p>\n'
    );

    expect(markdownIt.render(`![image](/logo.svg#light)`)).toEqual(
      '<p><img src="/logo.svg" alt="image" data-mode="lightmode-only"></p>\n'
    );
    expect(markdownIt.render(`![image](/logo.svg#dark)`)).toEqual(
      '<p><img src="/logo.svg" alt="image" data-mode="darkmode-only"></p>\n'
    );
  });

  it("Shoud support options", () => {
    expect(
      markdownItWithCustomOptions.render(`![image](/logo.svg#lightmode)`)
    ).toEqual(
      '<p><img src="/logo.svg" alt="image" data-mode="lightmode-only"></p>\n'
    );

    expect(
      markdownItWithCustomOptions.render(`![image](/logo.svg#darkmode)`)
    ).toEqual(
      '<p><img src="/logo.svg" alt="image" data-mode="darkmode-only"></p>\n'
    );
  });
});
