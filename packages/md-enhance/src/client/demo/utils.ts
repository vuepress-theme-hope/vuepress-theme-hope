import type Babel from "@babel/core";
import type { FunctionComponent } from "react";
import type {
  CodeType,
  NormalCode,
  ReactCode,
  VueCode,
  VueScript,
} from "./typings";
import type { CodeDemoOptions } from "../../shared";

declare global {
  interface Window {
    Babel: typeof Babel;
  }
}

declare const CODE_DEMO_OPTIONS: CodeDemoOptions;

export const options = CODE_DEMO_OPTIONS;

export const h = (
  tag: string,
  attrs: Record<string, string>,
  children?: HTMLElement[]
): HTMLElement => {
  const node = document.createElement(tag);
  attrs &&
    Object.keys(attrs).forEach((key) => {
      if (!key.indexOf("data")) {
        const k = key.replace("data", "");
        node.dataset[k] = attrs[key];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      } else node[key] = attrs[key];
    });

  if (children)
    children.forEach((child) => {
      node.appendChild(child);
    });

  return node;
};

const handleHTML = (html: string): string =>
  html
    .replace(/<br \/>/g, "<br>")
    .replace(/<((\S+)[^<]*?)\s+\/>/g, "<$1></$2>");

const getHtmlTemplate = (html: string): string =>
  `<div id="app">${handleHTML(html)}</div>`;

const getReactTemplate = (code: string): string =>
  `${code
    .replace("export default ", "")
    .replace(
      /App\.__style__(\s*)=(\s*)`([\s\S]*)?`/,
      ""
    )}ReactDOM.render(React.createElement(App), document.getElementById("app"))`;

const getVueJsTemplate = (js: string): string =>
  `new Vue({ el: '#app', ${js
    .replace(/export\s+default\s*\{(\n*[\s\S]*)\n*\}\s*;?$/u, "$1")
    .replace(
      /export\s+default\s*Vue\.extend\s*\(\s*\{(\n*[\s\S]*)\n*\}\s*\)\s*;?$/u,
      "$1"
    )
    .trim()} })`;

type PreProcessorType = "html" | "js" | "css";

const preProcessorConfig: Record<
  PreProcessorType,
  {
    types: string[];
    map: Record<string, string | undefined>;
  }
> = {
  html: {
    types: ["html", "slim", "haml", "md", "markdown", "vue"],
    map: {
      html: "none",
      vue: "none",
      md: "markdown",
    },
  },
  js: {
    types: [
      "js",
      "javascript",
      "coffee",
      "coffeescript",
      "ts",
      "typescript",
      "ls",
      "livescript",
    ],
    map: {
      js: "none",
      javascript: "none",
      coffee: "coffeescript",
      ls: "livescript",
      ts: "typescript",
    },
  },
  css: {
    types: ["css", "less", "sass", "scss", "stylus", "styl"],
    map: {
      css: "none",
      styl: "stylus",
    },
  },
};

export const getConfig = (
  config: Partial<CodeDemoOptions>
): CodeDemoOptions => {
  const result = {
    ...options,
    ...config,
  };

  if (config.jsLib && options.jsLib)
    result.jsLib = Array.from(
      new Set([...(options.jsLib || []), ...(config.jsLib || [])])
    );

  if (config.cssLib && options.cssLib)
    result.cssLib = Array.from(
      new Set([...(options.cssLib || []), ...(config.cssLib || [])])
    );

  return result;
};

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

export const getNormalCode = (
  code: CodeType,
  config: Partial<CodeDemoOptions>
): NormalCode => {
  const codeConfig = getConfig(config);
  const js = code.js[0] || "";

  return {
    ...codeConfig,
    html: handleHTML(code.html[0] || ""),
    js,
    css: code.css[0] || "",
    isLegal: code.isLegal,
    run: (): unknown => {
      const script = codeConfig.useBabel
        ? window.Babel.transform(js, { presets: ["es2015"] })?.code || ""
        : js;

      // eslint-disable-next-line @typescript-eslint/no-implied-eval
      return eval(`(function(){${script}})()`) as unknown;
    },
  };
};

export const getVueCode = (
  code: CodeType,
  config: Partial<CodeDemoOptions>
): VueCode => {
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
    getScript: (): VueScript => {
      const [commonScript, componentScript] = js.split(/export\s+default/u);
      const scriptString = `(function() {${commonScript} ; return ${componentScript}})()`;

      const scriptStr = config.useBabel
        ? window.Babel?.transform(scriptString, { presets: ["es2015"] })
            ?.code || ""
        : scriptString;

      const scriptObj = eval(scriptStr) as VueScript;
      scriptObj.template = html;

      return scriptObj;
    },
  };
};

export const getReactCode = (
  code: CodeType,
  config: Partial<CodeDemoOptions>
): ReactCode => {
  const codeConfig = getConfig(config);

  return {
    ...codeConfig,
    html: getHtmlTemplate(""),
    js: getReactTemplate(code.js[0] || ""),
    css: code.css[0] || "",
    isLegal: code.isLegal,
    jsLib: [codeConfig.react, codeConfig.reactDOM, ...codeConfig.jsLib],
    getComponent: (): FunctionComponent =>
      // eslint-disable-next-line @typescript-eslint/no-implied-eval
      new Function(
        `return (function(exports){var module={};module.exports=exports;${
          window.Babel?.transform(code.js[0] || "", {
            presets: ["es2015", "react"],
          })?.code || ""
        };return module.exports.__esModule?module.exports.default:module.exports;})({})`
      )() as FunctionComponent,
  };
};

export const injectCSS = (css: string, id: string): void => {
  const wrapper = document.querySelector(`#${id}`);

  const reg = /([\s\S]*?)\{([\s\S]*?)\}/gu;
  let scopeCss = "";
  let result;

  while ((result = reg.exec(css))) {
    const [, selectors, definition] = result;
    scopeCss += `${selectors
      .replace(/\n/g, "")
      .split(",")
      .map((selector) => `#${id} .demo-wrapper ${selector}`)
      .join(",")}{${definition}}`;
  }

  const style = h("style", { innerHTML: scopeCss });

  if (wrapper && !wrapper.hasAttribute("demo-styled")) {
    wrapper.appendChild(style);
    wrapper.setAttribute("demo-styled", "");
  }
};
