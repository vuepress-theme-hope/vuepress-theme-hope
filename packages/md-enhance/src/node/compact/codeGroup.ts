import { container } from "../markdown-it";
import { logger } from "../utils";

import type { MarkdownEnv } from "@vuepress/markdown";
import type { PluginSimple } from "markdown-it";

/** @deprecated */
export const legacyCodeGroup: PluginSimple = (md) => {
  md.use(container, {
    name: "code-group",
    openRender: (_tokens, _index, _options, env: MarkdownEnv) => {
      logger.warn(
        `Deprecated code-group syntax found${
          env.filePathRelative ? `in ${env.filePathRelative}` : ""
        }`
      );

      return `<CodeGroup>\n`;
    },
    closeRender: () => "</CodeGroup>\n",
  });

  md.use(container, {
    name: "code-group-item",
    openRender: (tokens, index) => {
      const { info } = tokens[index];
      const isActive = info.split(":").pop() === "active";

      return `<CodeGroupItem title="${
        isActive ? info.replace(/:active$/, "") : info
      }"${isActive ? " active" : ""}>\n`;
    },
    closeRender: () => "</CodeGroupItem>\n",
  });
};
