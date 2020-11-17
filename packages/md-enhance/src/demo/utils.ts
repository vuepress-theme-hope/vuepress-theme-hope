import { CodeDemoOptions } from "packages/md-enhance/types";

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

const getHtmlTemplate = (html: string): string => `<div id="app">${html}</div>`;

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

interface VueScript {
  (): unknown;
  template: string;
}

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

const getVanillaScript = (js: string): string =>
  window.Babel ? window.Babel.transform(js, { presets: ["es2015"] }).code : js;

export interface Code {
  code: {
    html: string;
    js: string;
    css: string;
  };
  template: {
    html: string;
    js: string;
  };

  jsLib: string[];
  cssLib: string[];
}

export interface VanillaCode extends Code {
  script: string;
}

export const getVanillaCode = (
  code: string,
  config: Partial<CodeDemoOptions>
): VanillaCode => {
  const htmlBlock = /<html>([\s\S]+)<\/html>/u.exec(code);
  const jsBlock = /<script>([\s\S]+)<\/script>/u.exec(code);
  const cssBlock = /<style>([\s\S]+)<\/style>/u.exec(code);
  const html = htmlBlock ? htmlBlock[1].replace(/^\n|\n$/g, "") : "";
  const js = jsBlock ? jsBlock[1].replace(/^\n|\n$/g, "") : "";
  const css = cssBlock ? cssBlock[1].replace(/^\n|\n$/g, "") : "";

  return {
    code: { html, js, css },
    template: { html, js },
    jsLib: config.jsLib || [],
    cssLib: config.cssLib || [],
    script: getVanillaScript(js),
  };
};

export interface VueCode extends Code {
  script: VueScript;
}

export const getVueCode = (
  code: string,
  config: Partial<CodeDemoOptions>
): VueCode => {
  const htmlBlock = /<template>([\s\S]+)<\/template>/u.exec(code);
  const jsBlock = /<script>([\s\S]+)<\/script>/u.exec(code);
  const cssBlock = /<style>([\s\S]+)<\/style>/u.exec(code);
  const html = htmlBlock ? htmlBlock[1].replace(/^\n|\n$/g, "") : "";
  const js = jsBlock ? jsBlock[1].replace(/^\n|\n$/g, "") : "";
  const css = cssBlock ? cssBlock[1].replace(/^\n|\n$/g, "") : "";

  return {
    code: { html, js, css },
    template: { html: getHtmlTemplate(html), js: getVueJsTemplate(js) },
    jsLib: [option.vue, ...(config.jsLib || [])],
    cssLib: config.cssLib || [],
    script: getVueScript(html, js),
  };
};

export const getReactCode = (
  code: string,
  config: Partial<CodeDemoOptions>
): Code | void => {
  if (window.Babel) {
    const reactComponent = window.Babel.transform(code, {
      presets: ["es2015", "react"],
    }).code;
    const script = `(function(exports){var module={};module.exports=exports;${reactComponent};return module.exports.__esModule?module.exports.default:module.exports;})({})`;
    // eslint-disable-next-line
    const scriptObj = new Function(`return ${script}`)() as {
      (): string;
      // eslint-disable-next-line @typescript-eslint/naming-convention
      __style__?: string;
    };

    return {
      code: {
        html: "",
        js: (scriptObj as unknown) as string,
        css: scriptObj.__style__ || "",
      },
      template: {
        html: getHtmlTemplate(""),
        js: getReactTemplate(code),
      },
      jsLib: [option.react, option.reactDOM, ...(config.jsLib || [])],
      cssLib: config.cssLib || [],
    };
  } else console.error("Babel not found");
};

export interface CodepenCode extends Code {
  preprocessor: {
    html: "none" | "slim" | "haml" | "markdown";
    js: "none" | "coffeescript" | "babel" | "livescript" | "typescript";
    css: "none" | "less" | "scss" | "sass" | "stylus";
  };
}

export const getCode = (
  code: string,
  config: Partial<CodeDemoOptions>,
  type: string
): CodepenCode => {
  if (type.includes("react")) {
    const result = /__style__\s*=\s*([`'"])([\s\S]*)\1/u.exec(code);

    return {
      code: { html: "", js: "", css: result ? result[2] : "" },
      template: {
        html: getHtmlTemplate(""),
        js: getReactTemplate(code),
      },
      jsLib: [option.react, option.reactDOM, ...(config.jsLib || [])],
      cssLib: config.cssLib || [],
      preprocessor: {
        html: config.html || "none",
        js: config.js || "none",
        css: config.css || "none",
      },
    };
  }

  if (type.includes("vue")) {
    const htmlBlock = /<template.*?>([\s\S]+)<\/template>/u.exec(code);
    const jsBlock = /<script.*?>([\s\S]+)<\/script>/u.exec(code);
    const cssBlock = /<style.*?>([\s\S]+)<\/style>/u.exec(code);
    const html = htmlBlock ? htmlBlock[1].replace(/^\n|\n$/g, "") : "";
    const js = jsBlock ? jsBlock[1].replace(/^\n|\n$/g, "") : "";
    const css = cssBlock ? cssBlock[1].replace(/^\n|\n$/g, "") : "";

    return {
      code: { html, js, css },
      template: { html: getHtmlTemplate(html), js: getVueJsTemplate(js) },
      jsLib: [option.vue, ...(config.jsLib || [])],
      cssLib: config.cssLib || [],
      preprocessor: {
        html: config.html || "none",
        js: config.js || "none",
        css: config.css || "none",
      },
    };
  }

  const htmlBlock = /<html>([\s\S]+)<\/html>/u.exec(code);
  const jsBlock = /<script>([\s\S]+)<\/script>/u.exec(code);
  const cssBlock = /<style.*?>([\s\S]+)<\/style>/u.exec(code);
  const html = htmlBlock ? htmlBlock[1].replace(/^\n|\n$/g, "") : "";
  const js = jsBlock ? jsBlock[1].replace(/^\n|\n$/g, "") : "";
  const css = cssBlock ? cssBlock[1].replace(/^\n|\n$/g, "") : "";

  return {
    code: { html, js, css },
    template: { html, js },
    jsLib: config.jsLib || [],
    cssLib: config.cssLib || [],
    preprocessor: {
      html: config.html || "none",
      js: config.js || "none",
      css: config.css || "none",
    },
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
      .map((selector) => `#${id} .display-wrapper ${selector}`)
      .join(",")}{${definition}}`;
  }

  const style = h("style", { innerHTML: scopeCss });

  if (wrapper && !wrapper.hasAttribute("data-styled")) {
    wrapper.appendChild(style);
    wrapper.setAttribute("data-styled", "");
  }
};
