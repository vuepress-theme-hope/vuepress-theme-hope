/* eslint-disable max-statements */
import hash = require("hash-sum");
import MarkdownIt = require("markdown-it");
import { generateUML } from "./utils";

export default (md: MarkdownIt): void => {
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
