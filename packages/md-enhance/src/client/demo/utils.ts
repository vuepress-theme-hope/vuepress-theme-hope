import type { CodeDemoOptions } from "../../types";

export const options = CODE_DEMO_OPTIONS;

export type PreProcessorType = "html" | "js" | "css";

export const preProcessorConfig: Record<
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

export const getConfig = (
  config: Partial<CodeDemoOptions>
): CodeDemoOptions => ({
  ...options,
  ...config,
  jsLib: Array.from(
    new Set([...(options.jsLib || []), ...(config.jsLib || [])])
  ),
  cssLib: Array.from(
    new Set([...(options.cssLib || []), ...(config.cssLib || [])])
  ),
});

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
