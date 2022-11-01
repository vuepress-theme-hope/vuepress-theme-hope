import { describe, expect, it } from "vitest";
import MarkdownIt from "markdown-it";
import { stylize } from "../../src/node/markdown-it/index.js";
import type { StylizeOptions, StylizeResult } from "../../src/shared/index.js";

describe("stylize", () => {
  const options: StylizeOptions = [
    {
      matcher: "MUST",
      replacer: ({ tag, attrs, content }): StylizeResult | void => {
        if (tag === "strong" || tag === "em")
          return {
            tag,
            attrs: { ...attrs, class: "badge tip" },
            content,
          };
      },
    },
    {
      matcher: "SHOULD",
      replacer: ({ tag, attrs, content }): StylizeResult | void => {
        if (tag === "strong")
          return {
            tag,
            attrs: { ...attrs, title: "should" },
            content,
          };
      },
    },
    {
      matcher: "MAY",
      replacer: ({ tag, attrs }): StylizeResult | void => {
        if (tag === "em") return { tag, attrs, content: "MAY:)" };
      },
    },
    {
      matcher: "NOT",
      replacer: ({ tag, attrs, content }): StylizeResult | void => {
        if (tag === "em") return { tag, attrs, content: `MUST_${content}` };
      },
    },
  ];

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

  it("Should render LINEs with MUST", () => {
    expect(
      markdownIt.render(
        "**MUST** at the beginning of the line\n\n" +
          "__MUST__ at the beginning of the line\n\n" +
          "At the end of the line *MUST*\n\n" +
          "At the end of the line _MUST_\n\n" +
          "Some content with **MUST** and some words.\n\n" +
          "Some content with __MUST__ and some words.\n\n"
      )
    ).toEqual(
      '<p><strong class="badge tip">MUST</strong> at the beginning of the line</p>\n' +
        '<p><strong class="badge tip">MUST</strong> at the beginning of the line</p>\n' +
        '<p>At the end of the line <em class="badge tip">MUST</em></p>\n' +
        '<p>At the end of the line <em class="badge tip">MUST</em></p>\n' +
        '<p>Some content with <strong class="badge tip">MUST</strong> and some words.</p>\n' +
        '<p>Some content with <strong class="badge tip">MUST</strong> and some words.</p>\n'
    );
  });

  it("Should render Complex with SHOULD", () => {
    expect(
      markdownIt.render(
        "`**MUST**` in inline code should be rendered as is.\n\n" +
          "Other syntax like _italic_ and **bold** should work with **MUST**\n\n" +
          "A invalid syntax like_MUST_ should not be parsed.\n\n" +
          "Other word not matching keywords like **MUS** and **MUSTS** should not be parsed.\n\n"
      )
    ).toEqual(
      "<p><code>**MUST**</code> in inline code should be rendered as is.</p>\n" +
        '<p>Other syntax like <em>italic</em> and <strong>bold</strong> should work with <strong class="badge tip">MUST</strong></p>\n' +
        "<p>A invalid syntax like_MUST_ should not be parsed.</p>\n" +
        "<p>Other word not matching keywords like <strong>MUS</strong> and <strong>MUSTS</strong> should not be parsed.</p>\n"
    );
  });
});
