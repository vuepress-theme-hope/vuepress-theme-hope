/* eslint-disable max-statements */
import { hash } from "@vuepress/utils";
import type { PluginSimple } from "markdown-it";
import type Token from "markdown-it/lib/token";

const flowchartRender = (tokens: Token[], idx: number): string => {
  const token = tokens[idx];
  const key = `flowchart-${hash(idx)}`;
  const { content, info } = token;

  return `<FlowChart id="${key}" code="${encodeURIComponent(
    content
  )}" preset="${info.trim().split(":")[1] || "vue"}"></FlowChart>`;
};

export const flowchart: PluginSimple = (md) => {
  // Handle ```flow and ```flowchart blocks
  const fence = md.renderer.rules.fence;

  md.renderer.rules.fence = (...args): string => {
    const [tokens, idx] = args;
    const { info } = tokens[idx];
    const realInfo = info.trim().split(":")[0];

    if (realInfo === "flow" || realInfo === "flowchart")
      return flowchartRender(tokens, idx);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return fence!(...args);
  };

  md.renderer.rules.flowchart = flowchartRender;
};
