import { container } from "@mdit/plugin-container";
import { encodeData } from "@vuepress/helper";
import type { PluginSimple } from "markdown-it";
import type Token from "markdown-it/lib/token.js";

import { logger } from "../utils.js";

/** @deprecated */
export const legacyCodeDemo: PluginSimple = (md) => {
  md.use(container, {
    name: "demo",
    openRender: (tokens: Token[], index: number): string => {
      logger.warn(
        "demo container is deprecated, you should use normal-demo, react-demo and vue-demo container instead.",
      );

      const { info } = tokens[index];
      const type = /\[(.*)\]/u.exec(info);
      const title = /^ demo\s*(?:\[.*?\])?\s*(.*)\s*$/u.exec(info);

      let config = "";
      const code: Record<string, string> = {};

      for (let i = index; i < tokens.length; i++) {
        const { type, content, info } = tokens[i];
        const language = info
          ? md.utils
              .unescapeAll(info)
              .trim()
              .match(/^([^ :[{]+)/)?.[1] || "text"
          : "";

        if (type === `container_demo_close`) break;
        if (!content) continue;
        if (type === "fence")
          if (language === "json") config = encodeData(content);
          else code[language] = content;
      }

      return `
<CodeDemo id="code-demo-${index}" type="${type?.[1] || "normal"}"${
        title ? ` title="${encodeURIComponent(title[1])}"` : ""
      }${config ? ` config="${config}"` : ""} code="${encodeData(
        JSON.stringify(code),
      )}">
`;
    },
    closeRender: () => `</CodeDemo>`,
  });
};
