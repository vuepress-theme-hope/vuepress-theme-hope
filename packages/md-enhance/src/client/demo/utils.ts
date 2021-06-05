import type { FunctionComponent } from "react";
import type {
  CodeType,
  NormalCode,
  ReactCode,
  VueCode,
  VueScript,
} from "./typings";
import type { CodeDemoOptions, CodeDemoGlobalOptions } from "../../shared";

declare const CODE_DEMO_OPTIONS: CodeDemoGlobalOptions;

export const option = CODE_DEMO_OPTIONS;

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

const getVueScript = (html: string, js: string): VueScript => {
  const scripts = js.split(/export\s+default/u);
  const scriptStrOrg = `(function() {${scripts[0]} ; return ${scripts[1]}})()`;

  const scriptStr = window.Babel
    ? window.Babel.transform(scriptStrOrg, { presets: ["es2015"] }).code
    : scriptStrOrg;

  const scriptObj = [eval][0](scriptStr) as VueScript;
  scriptObj.template = html;

  return scriptObj;
};

const getNormalScript = (js: string): (() => unknown) => {
  const script = window.Babel
    ? window.Babel.transform(js, { presets: ["es2015"] }).code
    : js;

  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  return new Function(`return (function(){${script}})()`) as () => unknown;
};

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
): NormalCode => ({
  html: handleHTML(code.html[0] || ""),
  js: code.js[0] || "",
  css: code.css[0] || "",
  jsLib: config.jsLib || [],
  cssLib: config.cssLib || [],
  script: code.isLegal ? getNormalScript(code.js[0] || "") : undefined,
});

export const getVueCode = (
  code: CodeType,
  config: Partial<CodeDemoOptions>
): VueCode => {
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
    html: getHtmlTemplate(html),
    js: getVueJsTemplate(js),
    css,
    jsLib: [option.vue, ...(config.jsLib || [])],
    cssLib: config.cssLib || [],
    script: isLegal ? getVueScript(html, js) : undefined,
  };
};

export const getReactCode = (
  code: CodeType,
  config: Partial<CodeDemoOptions>
): ReactCode => {
  const scriptObj =
    code.isLegal && window.Babel
      ? // eslint-disable-next-line
        (new Function(
          `return (function(exports){var module={};module.exports=exports;${
            window.Babel.transform(code.js[0] || "", {
              presets: ["es2015", "react"],
            }).code
          };return module.exports.__esModule?module.exports.default:module.exports;})({})`
        )() as FunctionComponent)
      : undefined;

  return {
    html: getHtmlTemplate(""),
    js: getReactTemplate(code.js[0] || ""),
    css: code.css[0] || "",
    jsLib: [option.react, option.reactDOM, ...(config.jsLib || [])],
    cssLib: config.cssLib || [],
    script: scriptObj,
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
