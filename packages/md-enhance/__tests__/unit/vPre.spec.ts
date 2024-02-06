import MarkdownIt from "markdown-it";
import { describe, expect, it } from "vitest";

import { vPre } from "../../src/node/markdown-it/vPre.js";

describe("v-pre", () => {
  it("should add v-pre wrapper", () => {
    const markdownIt = MarkdownIt({ linkify: true }).use(vPre);

    expect(markdownIt.render("::: v-pre\n{{a}}\n:::\n")).toBe(
      "<div v-pre>\n<p>{{a}}</p>\n</div>\n",
    );
  });
});
