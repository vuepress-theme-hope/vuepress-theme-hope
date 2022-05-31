import { hash } from "@vuepress/utils";
import { uml } from "../markdown-it";

import type { PluginSimple } from "markdown-it";

/** @deprecated */
export const legacyFlowchart: PluginSimple = (md) => {
  uml(md, {
    name: "flowchart",
    open: "flowstart",
    close: "flowend",
    render: (tokens, idx): string => {
      console.warn(
        '"@flowstart ... @flowend" is deprecated, you should use ```flow ... ``` instead.'
      );

      const token = tokens[idx];
      const key = `flowchart_${hash(idx)}`;
      const { content, info } = token;

      return `<FlowChart id="${key}" code="${encodeURIComponent(
        content
      )}" preset="${info.trim() || "vue"}"></FlowChart>`;
    },
  });
};
