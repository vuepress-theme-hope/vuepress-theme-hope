import { hash } from "@vuepress/utils";
import { generateUML } from "./utils";

import type MarkdownIt from "markdown-it";

export const presentation = (md: MarkdownIt): void => {
  md.block.ruler.before(
    "fence",
    "presentation",
    generateUML({
      name: "presentation",
      open: "slidestart",
      close: "slideend",
    }),
    { alt: ["paragraph", "reference", "blockquote", "list"] }
  );

  md.renderer.rules.presentation = (tokens, idx): string => {
    const token = tokens[idx];
    const key = `presentation-${hash(idx)}`;
    const { content, info } = token;

    return `<Presentation id="${key}" data-code="${encodeURIComponent(
      content
    )}" theme="${info.trim() || "auto"}"></Presentation>`;
  };
};
