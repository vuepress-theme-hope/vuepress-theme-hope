import hash = require("hash-sum");
import Token = require("markdown-it/lib/token");

export const codeDemoRender = (tokens: Token[], idx: number): string => {
  const { nesting, info } = tokens[idx];

  if (nesting === -1)
    return `
            </div>
            <div class="code-demo-footer" />
          </div>
          `;

  let codeStr = "";
  let configStr = "";

  for (let i = idx; i < tokens.length; i++) {
    const { type, content, info } = tokens[i];
    if (type === "container_demo_close") break;
    if (!content) continue;
    if (type === "fence") {
      if (info === "json") configStr = encodeURIComponent(content);
      else codeStr = encodeURIComponent(content);
    }
  }

  return `
          <div
            id="code-demo-${hash(codeStr)}"
            class="code-demo-wrapper"
            style="display: none;"
            data-config="${configStr}"
            data-type="${info}"
            data-code="${codeStr}">
              <div class="display-wrapper">
                <div class="code-demo-app" />
              </div>
              <div class="code-wrapper">
        `;
};

export const codeDemoDefaultSetting = {
  jsLib: [],
  cssLib: [],
  jsfiddle: true,
  codepen: true,
  codepenLayout: "left",
  codepenJsProcessor: "babel",
  codepenEditors: "101",
  horizontal: false,
  vue: "https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js",
  react: "https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js",
  reactDOM:
    "https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js",
};
