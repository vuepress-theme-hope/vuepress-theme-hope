import { describe, expect, it } from "vitest";
import MarkdownIt = require("markdown-it");
import { stylize } from "../../src/node/markdown-it";
import { StylizeOption } from "../../src/shared";

describe("subscript", () => {
  const options: StylizeOption = {
    MUST: {
      tag: ["strong", "em"],
      attr: [
        ["class", "badge"],
        ["class", "tip"],
      ],
    },
    SHOULD: {
      tag: ["strong"],
      attr: [["title", "should"]],
    },
    MAY: {
      tag: ["em"],
      text: "MAY:)",
    },
    NOT: {
      tag: ["em"],
      text: (str) => "MUST_" + str,
    },
  };
  const markdownIt = MarkdownIt({ linkify: true }).use(stylize, options);

  it("Should render MUST", () => {
    expect(markdownIt.render(`**MUST**`)).toEqual(
      '<p><strong class="badge tip">MUST</strong></p>\n'
    );
    expect(markdownIt.render(`*MUST*`)).toEqual(
      '<p><em class="badge tip">MUST</em></p>\n'
    );
  });

  it("Should render SHOULD", () => {
    expect(markdownIt.render(`**SHOULD**`)).toEqual(
      '<p><strong title="should">SHOULD</strong></p>\n'
    );
    expect(markdownIt.render(`*SHOULD*`)).toEqual("<p><em>SHOULD</em></p>\n");
  });

  it("Should render MAY", () => {
    expect(markdownIt.render(`**MAY**`)).toEqual(
      "<p><strong>MAY</strong></p>\n"
    );
    expect(markdownIt.render(`*MAY*`)).toEqual("<p><em>MAY:)</em></p>\n");
  });

  it("Should render NOT", () => {
    expect(markdownIt.render(`**NOT**`)).toEqual(
      "<p><strong>NOT</strong></p>\n"
    );
    expect(markdownIt.render(`*NOT*`)).toEqual("<p><em>MUST_NOT</em></p>\n");
  });

  it("Should NOT render SHOULD", () => {
    expect(
      markdownIt.render(`**SHOULD**/**MUST**`, {
        frontmatter: { noStylize: ["SHOULD"] },
      })
    ).toEqual(
      '<p><strong>SHOULD</strong>/<strong class="badge tip">MUST</strong></p>\n'
    );
  });
});
