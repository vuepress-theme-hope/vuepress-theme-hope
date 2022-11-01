import { describe, it, expect } from "vitest";
import MarkdownIt from "markdown-it";
import { imageMark } from "../../src/node/markdown-it/index.js";

describe("Image Mark", () => {
  const markdownIt = MarkdownIt({ linkify: true }).use(imageMark);
  const markdownItWithCustomOptions = MarkdownIt({ linkify: true }).use(
    imageMark,
    {
      light: ["lightmode"],
      dark: ["darkmode"],
    }
  );

  it("Should render", () => {
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

  it("Should support options", () => {
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

  it("Should not be effected by title", () => {
    expect(markdownIt.render(`![image](/logo.svg#light "title")`)).toEqual(
      '<p><img src="/logo.svg" alt="image" title="title" data-mode="lightmode-only"></p>\n'
    );

    expect(
      markdownIt.render(`![image](/logo.svg#dark "another title")`)
    ).toEqual(
      '<p><img src="/logo.svg" alt="image" title="another title" data-mode="darkmode-only"></p>\n'
    );

    expect(
      markdownItWithCustomOptions.render(
        `![image](/logo.svg#lightmode "title")`
      )
    ).toEqual(
      '<p><img src="/logo.svg" alt="image" title="title" data-mode="lightmode-only"></p>\n'
    );

    expect(
      markdownItWithCustomOptions.render(
        `![image](/logo.svg#darkmode "another title")`
      )
    ).toEqual(
      '<p><img src="/logo.svg" alt="image" title="another title" data-mode="darkmode-only"></p>\n'
    );
  });
});
