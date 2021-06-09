import { hash } from "@vuepress/utils";

import type Token from "markdown-it/lib/token";

export const codeDemoRender = (tokens: Token[], idx: number): string => {
  const { nesting, info } = tokens[idx];
  const type = /\[(.*)\]/u.exec(info);
  const title = /^ demo\s*(?:\[.*?\])?\s*(.*)\s*$/u.exec(info);

  if (nesting === -1)
    return `
    </div>
  </div>
  <div class="code-demo-footer"></div>
</div>
`;

  let config = "";
  const code: Record<string, string> = {};

  for (let i = idx; i < tokens.length; i++) {
    const { type, content, info } = tokens[i];
    if (type === "container_demo_close") break;
    if (!content) continue;
    if (type === "fence") {
      if (info === "json") config = encodeURIComponent(content);
      else code[info] = content;
    }
  }

  return `
<div id="code-demo-${hash(code)}" class="code-demo-wrapper" ${
    type ? `data-type="${encodeURIComponent(type[1])}"` : ""
  } ${title ? `data-title="${encodeURIComponent(title[1])}"` : ""} ${
    config ? `data-config="${config}"` : ""
  } data-code="${encodeURIComponent(JSON.stringify(code))}">
  <div class="demo-wrapper">
    <div class="code-demo-app"></div>
  </div>
  <div class="code-wrapper">
    <div class="code">
`;
};

export const codeDemoDefaultSetting = {
  jsLib: [],
  cssLib: [],
  codepenLayout: "left",
  codepenJsProcessor: "babel",
  codepenEditors: "101",
  vue: "https://cdn.jsdelivr.net/npm/vue@next/dist/vue.global.prod.js",
  react: "https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js",
  reactDOM:
    "https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js",
};
