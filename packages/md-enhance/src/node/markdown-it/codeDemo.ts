import { hash } from "@vuepress/utils";

import type { default as Token } from "markdown-it/lib/token";
import type { CodeDemoOptions } from "../../shared";

const getRender =
  (demoType: string) =>
  (tokens: Token[], index: number): string => {
    const { nesting, info } = tokens[index];
    const title = info.trimStart().slice(demoType.length).trim();

    if (nesting === -1) return `</CodeDemo>`;

    let config = "";
    const code: Record<string, string> = {};

    for (let i = index; i < tokens.length; i++) {
      const { type, content, info } = tokens[i];

      if (type === `container_${demoType}_close`) break;
      if (!content) continue;
      if (type === "fence") {
        if (info === "json") config = encodeURIComponent(content);
        else code[info] = content;
      }
    }

    return `
<CodeDemo id="code-demo-${hash(code)}" type="${demoType.split("-")[0]}"${
      title ? ` title="${encodeURIComponent(title)}"` : ""
    }${config ? ` config="${config}"` : ""} code="${encodeURIComponent(
      JSON.stringify(code)
    )}">
`;
  };

export const normalDemoRender = getRender("normal-demo");
export const vueDemoRender = getRender("vue-demo");
export const reactDemoRender = getRender("react-demo");

export const codeDemoDefaultSetting: CodeDemoOptions = {
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
