import hash = require("hash-sum");
import Token = require("markdown-it/lib/token");

export const codeDemoRender = (tokens: Token[], idx: number): string => {
  const { nesting, info } = tokens[idx];
  const type = /\[(.*)\]/u.exec(info);
  const title = /^ demo\s*(?:\[.*?\])?\s*(.*)\s*$/u.exec(info);
  if (nesting === -1)
    return `
            </div>
            <div class="code-demo-footer" />
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
          <div
            id="code-demo-${hash(code)}"
            class="code-demo-wrapper"
            style="display: none;"
  ${type ? `data-type="${encodeURIComponent(type[1])}"` : ""}
 ${title ? `data-title="${encodeURIComponent(title[1])}"` : ""}
${config ? `data-config="${config}"` : ""}
            data-code="${encodeURIComponent(JSON.stringify(code))}"
          >
              <div class="demo-wrapper">
                <div class="code-demo-app" />
              </div>
              <div class="code-demo-container">
        `;
};

export const codeDemoDefaultSetting = {
  jsLib: [],
  cssLib: [],
  codepenLayout: "left",
  codepenJsProcessor: "babel",
  codepenEditors: "101",
  horizontal: false,
  vue: "https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js",
  react: "https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js",
  reactDOM:
    "https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js",
};
