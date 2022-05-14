import { getConfig, preProcessorConfig } from "./utils";

import type Babel from "@babel/core";
import type { Code, CodeType } from "./typings";
import type { PreProcessorType } from "./utils";
import type { CodeDemoOptions } from "../../../shared";

declare global {
  interface Window {
    Babel: typeof Babel;
  }
}

export const getCode = (code: Record<string, string>): CodeType => {
  const languages = Object.keys(code);
  const result: CodeType = {
    html: [],
    js: [],
    css: [],
    isLegal: false,
  };

  (["html", "js", "css"] as PreProcessorType[]).forEach((type) => {
    const match = languages.filter((language) =>
      preProcessorConfig[type].types.includes(language)
    );

    if (match.length) {
      const language = match[0];

      result[type] = [
        code[language].replace(/^\n|\n$/g, ""),
        preProcessorConfig[type].map[language] || language,
      ];
    }
  });

  result.isLegal =
    (!result.html.length || result.html[1] === "none") &&
    (!result.js.length || result.js[1] === "none") &&
    (!result.css.length || result.css[1] === "none");

  return result;
};

const handleHTML = (html: string): string =>
  html
    .replace(/<br \/>/g, "<br>")
    .replace(/<((\S+)[^<]*?)\s+\/>/g, "<$1></$2>");

const getHtmlTemplate = (html: string): string =>
  `<div id="app">\n${handleHTML(html)}\n</div>`;

const getReactTemplate = (code: string): string =>
  `${code
    .replace("export default ", "const $reactApp = ")
    .replace(
      /App\.__style__(\s*)=(\s*)`([\s\S]*)?`/,
      ""
    )};\nReactDOM.createRoot(document.getElementById("app")).render(React.createElement($reactApp))`;

const getVueJsTemplate = (js: string): string =>
  js
    .replace(
      /export\s+default\s*\{(\n*[\s\S]*)\n*\}\s*;?$/u,
      "Vue.createApp({$1}).mount('#app')"
    )
    .replace(
      /export\s+default\s*define(Async)?Component\s*\(\s*\{(\n*[\s\S]*)\n*\}\s*\)\s*;?$/u,
      "Vue.createApp({$1}).mount('#app')"
    )
    .trim();

export const wrapper = (scriptStr: string): string =>
  `(function(exports){var module={};module.exports=exports;${scriptStr};return module.exports.__esModule?module.exports.default:module.exports;})({})`;

export const getNormalCode = (
  code: CodeType,
  config: Partial<CodeDemoOptions>
): Code => {
  const codeConfig = getConfig(config);
  const js = code.js[0] || "";

  return {
    ...codeConfig,
    html: handleHTML(code.html[0] || ""),
    js,
    css: code.css[0] || "",
    isLegal: code.isLegal,
    getScript: (): string =>
      codeConfig.useBabel
        ? window.Babel.transform(js, { presets: ["es2015"] })?.code || ""
        : js,
  };
};

export const getVueCode = (
  code: CodeType,
  config: Partial<CodeDemoOptions>
): Code => {
  const codeConfig = getConfig(config);

  const vueTemplate = code.html[0] || "";
  const htmlBlock = /<template>([\s\S]+)<\/template>/u.exec(vueTemplate);
  const jsBlock = /<script(\s*lang=(['"])(.*?)\2)?>([\s\S]+)<\/script>/u.exec(
    vueTemplate
  );
  const cssBlock =
    /<style(\s*lang=(['"])(.*?)\2)?\s*(?:scoped)?>([\s\S]+)<\/style>/u.exec(
      vueTemplate
    );
  const html = htmlBlock ? htmlBlock[1].replace(/^\n|\n$/g, "") : "";
  const [js = "", jsLang = ""] = jsBlock
    ? [jsBlock[4].replace(/^\n|\n$/g, ""), jsBlock[3]]
    : [];
  const [css = "", cssLang = ""] = cssBlock
    ? [cssBlock[4].replace(/^\n|\n$/g, ""), cssBlock[3]]
    : [];

  const isLegal = jsLang === "" && (cssLang === "" || cssLang === "css");

  return {
    ...codeConfig,
    html: getHtmlTemplate(html),
    js: getVueJsTemplate(js),
    css,
    isLegal,
    jsLib: [codeConfig.vue, ...codeConfig.jsLib],
    getScript: (): string => {
      const scriptStr = config.useBabel
        ? window.Babel?.transform(js, { presets: ["es2015"] })?.code || ""
        : js.replace(/export\s+default/u, "return");

      return `const app=window.document.createElement('div');document.firstElementChild.appendChild(app);const appOptions=${wrapper(
        scriptStr
      )};appOptions.template=\`${html.replace(
        "`",
        '\\`"'
      )}\`;window.Vue.createApp(appOptions).mount(app);`;
    },
  };
};

export const getReactCode = (
  code: CodeType,
  config: Partial<CodeDemoOptions>
): Code => {
  const codeConfig = getConfig(config);

  return {
    ...codeConfig,
    html: getHtmlTemplate(""),
    js: getReactTemplate(code.js[0] || ""),
    css:
      code.css[0] ||
      (code.js[0]
        ? code.js[0]
            .replace(/App\.__style__(?:\s*)=(?:\s*)`([\s\S]*)?`/, "$1")
            .trim()
        : ""),
    isLegal: code.isLegal,
    jsLib: [codeConfig.react, codeConfig.reactDOM, ...codeConfig.jsLib],
    jsx: true,
    getScript: (): string => {
      const scriptStr =
        window.Babel?.transform(code.js[0] || "", {
          presets: ["es2015", "react"],
        })?.code || "";

      return `window.ReactDOM.createRoot(document.firstElementChild).render(window.React.createElement(${wrapper(
        scriptStr
      )}))`;
    },
  };
};
