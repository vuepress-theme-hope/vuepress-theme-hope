import { container } from "@mdit/plugin-container";
import type { PluginSimple } from "markdown-it";
import type Token from "markdown-it/lib/token.js";
import { utoa } from "vuepress-shared/node";

import type { CodeDemoOptions } from "../../shared/index.js";

export const CODE_DEMO_DEFAULT_SETTING: CodeDemoOptions = {
  useBabel: false,
  jsLib: [],
  cssLib: [],
  codepenLayout: "left",
  codepenEditors: "101",
  babel: "https://unpkg.com/@babel/standalone/babel.min.js",
  vue: "https://unpkg.com/vue/dist/vue.global.prod.js",
  react: "https://unpkg.com/react/umd/react.production.min.js",
  reactDOM: "https://unpkg.com/react-dom/umd/react-dom.production.min.js",
};

const getPlugin =
  (name: string): PluginSimple =>
  (md) =>
    container(md, {
      name,
      openRender: (tokens: Token[], index: number): string => {
        const title = tokens[index].info.trimStart().slice(name.length).trim();

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

          if (type === `container_${name}_close`) break;
          if (!content) continue;
          if (type === "fence")
            if (language === "json") config = utoa(content);
            else code[language] = content;
        }

        return `
<CodeDemo id="code-demo-${index}" type="${name.split("-")[0]}"${
          title ? ` title="${encodeURIComponent(title)}"` : ""
        }${config ? ` config="${config}"` : ""} code="${utoa(
          JSON.stringify(code),
        )}">
`;
      },
      closeRender: () => `</CodeDemo>`,
    });

export const normalDemo: PluginSimple = getPlugin("normal-demo");

export const vueDemo: PluginSimple = getPlugin("vue-demo");

export const reactDemo: PluginSimple = getPlugin("react-demo");
