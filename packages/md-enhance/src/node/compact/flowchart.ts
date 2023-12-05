import { uml } from "@mdit/plugin-uml";
import { logger } from "@vuepress/utils";
import type { PluginSimple } from "markdown-it";
import { utoa } from "vuepress-shared/node";

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

      return `<FlowChart id="${key}" code="${utoa(content)}" preset="${
        info.trim() || "vue"
      }"></FlowChart>`;
    },
  });
};
