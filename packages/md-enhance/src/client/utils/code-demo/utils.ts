import { isDef, isPlainObject, keys } from "@vuepress/helper/client";

import type { Code } from "./typings.js";
import type { CodeDemoOptions } from "../../../shared/index.js";

declare const CODE_DEMO_OPTIONS: CodeDemoOptions;

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
  attrs?: Record<string, string>,
  children?: HTMLElement[],
): HTMLElement => {
  const node = document.createElement(tag);

  if (isPlainObject(attrs))
    keys(attrs).forEach((key) => {
      if (key.indexOf("data")) {
        // @ts-expect-error: Type is not accurate
        node[key] = attrs[key];
      } else {
        const trippedKey = key.replace("data", "");

        node.dataset[trippedKey] = attrs[key];
      }
    });

  if (children)
    children.forEach((child) => {
      node.append(child);
    });

  return node;
};

export const getConfig = (
  config: Partial<CodeDemoOptions>,
): CodeDemoOptions => ({
  ...options,
  ...config,
  jsLib: [...new Set([options.jsLib, config.jsLib ?? []].flat())],
  cssLib: [...new Set([options.cssLib, config.cssLib ?? []].flat())],
});

export const loadScript = (
  state: Record<string, Promise<void>>,
  link: string,
): Promise<void> => {
  if (isDef(state[link])) return state[link];

  const loadEvent = new Promise<void>((resolve) => {
    const script = document.createElement("script");

    script.src = link;
    document.querySelector("body")?.append(script);

    script.addEventListener("load", (): void => {
      resolve();
    });
  });

  state[link] = loadEvent;

  return loadEvent;
};

export const injectCSS = (shadowRoot: ShadowRoot, code: Code): void => {
  if (
    code.css &&
    // Style not injected
    [...shadowRoot.childNodes].every((element) => element.nodeName !== "STYLE")
  ) {
    const style = h("style", { innerHTML: code.css });

    shadowRoot.append(style);
  }
};

export const injectScript = (
  id: string,
  shadowRoot: ShadowRoot,
  code: Code,
): void => {
  const scriptText = code.getScript();

  if (
    scriptText &&
    // Style not injected
    [...shadowRoot.childNodes].every((element) => element.nodeName !== "SCRIPT")
  ) {
    const script = document.createElement("script");

    script.append(
      document.createTextNode(
        // Here we are fixing `document` variable back to shadowDOM
        `{const document=window.document.querySelector('#${id} .vp-code-demo-display').shadowRoot;\n${scriptText}}`,
      ),
    );
    shadowRoot.append(script);
  }
};
