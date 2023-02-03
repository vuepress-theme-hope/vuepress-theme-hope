import { container } from "@mdit/plugin-container";
import { type PluginSimple } from "markdown-it";
import type Token from "markdown-it/lib/token.js";
import { utoa } from "vuepress-shared/node";

/** @deprecated */
export const legacyCodeDemo: PluginSimple = (md) => {
  md.use(container, {
    name: "demo",
    openRender: (tokens: Token[], index: number): string => {
      const { info } = tokens[index];
      const type = /\[(.*)\]/u.exec(info);
      const title = /^ demo\s*(?:\[.*?\])?\s*(.*)\s*$/u.exec(info);

      let config = "";
      const code: Record<string, string> = {};

      for (let i = index; i < tokens.length; i++) {
        const { type, content, info } = tokens[i];

        if (type === `container_demo_close`) break;
        if (!content) continue;
        if (type === "fence")
          if (info === "json") config = utoa(content);
          else code[info] = content;
      }

      return `
<CodeDemo id="code-demo-${index}" type="${type?.[1] || "normal"}"${
        title ? ` title="${encodeURIComponent(title[1])}"` : ""
      }${config ? ` config="${config}"` : ""} code="${utoa(
        JSON.stringify(code)
      )}">
`;
    },
    closeRender: () => `</CodeDemo>`,
  });
};
