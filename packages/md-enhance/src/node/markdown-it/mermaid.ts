import { hash } from "@vuepress/utils";
import Token from "markdown-it/lib/token";

import type MarkdownIt from "markdown-it";

const mermaidRender = (tokens: Token[], idx: number): string => {
  const token = tokens[idx];
  const key = `mermaid-${hash(idx)}`;
  const { content } = token;

  return `<Mermaid id="${key}" data-code="${encodeURIComponent(
    content
  )}"></Mermaid>`;
};

// a hack for sequenceDiagram
const mermaidHackRender = (
  name: string,
  content: string,
  idx: number
): string =>
  `<Mermaid id="mermaid-${hash(idx)}" data-code="${encodeURIComponent(
    `${name}\n${content
      .split("\n")
      .map((line) => (line ? `    ${line}` : ""))
      .join("\n")}`
  )}"></Mermaid>`;

export const mermaid = (md: MarkdownIt): void => {
  // Handle ```mermaid blocks
  const fence = md.renderer.rules.fence;

  md.renderer.rules.fence = (...args): string => {
    const [tokens, idx] = args;
    const { content, info } = tokens[idx];

    if (info.trim() === "mermaid") return mermaidRender(tokens, idx);
    if (info.trim() === "sequence")
      return mermaidHackRender("sequenceDiagram", content, idx);
    if (info.trim() === "class")
      return mermaidHackRender("classDiagram", content, idx);
    if (info.trim() === "state")
      return mermaidHackRender("stateDiagram-v2", content, idx);
    if (info.trim() === "er")
      return mermaidHackRender("erDiagram", content, idx);
    if (info.trim() === "journey")
      return mermaidHackRender("journey", content, idx);
    if (info.trim() === "gantt")
      return mermaidHackRender("gantt", content, idx);
    if (info.trim() === "pie") return mermaidHackRender("pie", content, idx);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return fence!(...args);
  };

  md.renderer.rules.mermaid = mermaidRender;
};
