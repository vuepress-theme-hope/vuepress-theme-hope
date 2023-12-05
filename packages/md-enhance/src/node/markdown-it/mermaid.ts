import type { PluginSimple } from "markdown-it";
import type Renderer from "markdown-it/lib/renderer.js";
import { utoa } from "vuepress-shared/node";

const mermaidRenderer: Renderer.RenderRule = (tokens, index) =>
  `<Mermaid id="mermaid-${index}" code="${utoa(
    tokens[index].content,
  )}"></Mermaid>`;

interface MermaidOptions {
  content: string;
  diagram?: string;
  title?: string;
}

export const getMermaidContent = ({
  diagram = "mermaid",
  content,
  title = "",
}: MermaidOptions): string => `\
${
  title
    ? `\
---
title: ${title}
---

`
    : ""
}\
${
  diagram === "mermaid"
    ? ""
    : `\
${diagram}
`
}\
${
  diagram === "mermaid" || diagram === "sankey-beta"
    ? content
    : content
        .split("\n")
        .map((line) => (line ? `  ${line}` : ""))
        .join("\n")
}\
`;

const getMermaid = (options: MermaidOptions, index: number): string =>
  `<Mermaid id="mermaid-${index}" code="${utoa(getMermaidContent(options))}"${
    options.title ? ` title="${utoa(options.title)}"` : ""
  }></Mermaid>`;

const DIAGRAM_MAP: Record<string, string> = {
  class: "classDiagram",
  c4c: "C4Context",
  er: "erDiagram",
  gantt: "gantt",
  "git-graph": "gitGraph",
  journey: "journey",
  mindmap: "mindmap",
  pie: "pie",
  quadrant: "quadrantChart",
  requirement: "requirementDiagram",
  sankey: "sankey-beta",
  sequence: "sequenceDiagram",
  state: "stateDiagram-v2",
  timeline: "timeline",
  xy: "xychart-beta",
};

export const mermaid: PluginSimple = (md) => {
  // Handle ```mermaid blocks
  const fence = md.renderer.rules.fence;

  md.renderer.rules.fence = (...args): string => {
    const [tokens, index] = args;
    const { content, info } = tokens[index];

    const fenceInfo = info.trim();

    if (fenceInfo === "mermaid") return getMermaid({ content }, index);

    const [name, ...rest] = fenceInfo.split(" ");

    if (DIAGRAM_MAP[name])
      return getMermaid(
        { diagram: DIAGRAM_MAP[name], title: rest.join(" "), content },
        index,
      );

    return fence!(...args);
  };

  md.renderer.rules["mermaid"] = mermaidRenderer;
};
