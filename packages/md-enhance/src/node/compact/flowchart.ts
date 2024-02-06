import { uml } from "@mdit/plugin-uml";
import { encodeData } from "@vuepress/helper";
import type { PluginSimple } from "markdown-it";
import { logger } from "vuepress/utils";

/** @deprecated */
export const legacyFlowchart: PluginSimple = (md) => {
  uml(md, {
    name: "flowchart",
    open: "flowstart",
    close: "flowend",
    render: (tokens, index): string => {
      logger.warn(
        '"@flowstart ... @flowend" is deprecated, you should use ```flow ... ``` instead.',
      );

      const token = tokens[index];
      const key = `flowchart-${index}`;
      const { content, info } = token;

      return `<FlowChart id="${key}" code="${encodeData(content)}" preset="${
        info.trim() || "vue"
      }"></FlowChart>`;
    },
  });
};
