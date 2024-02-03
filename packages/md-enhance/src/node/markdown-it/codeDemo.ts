import { container } from "@mdit/plugin-container";
import { demo } from "@mdit/plugin-demo";
import { encodeData } from "@vuepress/helper";
import type { PluginSimple } from "markdown-it";
import type Token from "markdown-it/lib/token.js";

import { escapeHtml } from "./utils.js";
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
            if (language === "json") config = encodeData(content);
            else code[language] = content;
        }

        return `
<CodeDemo id="code-demo-${index}" type="${name.split("-")[0]}"${
          title ? ` title="${encodeURIComponent(title)}"` : ""
        }${config ? ` config="${config}"` : ""} code="${encodeData(
          JSON.stringify(code),
        )}">
`;
      },
      closeRender: () => `</CodeDemo>`,
    });

export const normalDemo: PluginSimple = getPlugin("normal-demo");

export const vueDemo: PluginSimple = getPlugin("vue-demo");

export const reactDemo: PluginSimple = getPlugin("react-demo");

export const mdDemo: PluginSimple = (md) => {
  md.use(demo, {
    name: "md-demo",
    openRender: (tokens, index) =>
      `<MdDemo title="${escapeHtml(
        tokens[index].info,
      )}" id="md-demo-${index}"><template #default>\n`,
    codeRender: (tokens, index, options, _env, self) => {
      const token = tokens[index];

      token.type = "fence";
      token.info = "md";
      token.markup = "```";
      // Handle include rule
      token.content = token.content
        .split("\n")
        .filter(
          (item) =>
            item[0] !== "@" || !item.match(/^@include-p(?:ush\(.*\)|op)$/),
        )
        .join("\n");

      return `</template><template #code>\n${self.rules.fence!(
        tokens,
        index,
        options,
        _env,
        self,
      )}`;
    },
    closeRender: () => "</template></MdDemo>",
  });
};
