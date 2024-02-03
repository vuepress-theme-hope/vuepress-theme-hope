import { encodeData } from "@vuepress/helper";
import type { PluginSimple } from "markdown-it";
import type Token from "markdown-it/lib/token.js";

const flowchartRender = (tokens: Token[], index: number): string => {
  const token = tokens[index];
  const key = `flowchart-${index}`;
  const { content, info } = token;

  return `<FlowChart id="${key}" code="${encodeData(content)}" preset="${
    info.trim().split(":", 2)[1] || "vue"
  }"></FlowChart>`;
};

export const flowchart: PluginSimple = (md) => {
  // Handle ```flow and ```flowchart blocks
  const { fence } = md.renderer.rules;

  md.renderer.rules.fence = (...args): string => {
    const [tokens, index] = args;
    const { info } = tokens[index];
    const [realInfo] = info.split(":", 2);

    if (realInfo === "flow" || realInfo === "flowchart")
      return flowchartRender(tokens, index);

    return fence!(...args);
  };

  md.renderer.rules["flowchart"] = flowchartRender;
};
