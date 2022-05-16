import type { Code } from "./typings";
import type { CodeDemoOptions } from "../../../shared";

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

export const loadScript = (
  state: Record<string, Promise<void>>,
  link: string
): Promise<void> => {
  if (state[link] !== undefined) return state[link];

  const loadEvent = new Promise<void>((resolve) => {
    const script = document.createElement("script");

    script.src = link;
    document.querySelector("body")?.appendChild(script);

    script.onload = (): void => {
      resolve();
    };
  });

  state[link] = loadEvent;

  return loadEvent;
};

export const injectCSS = (shadowRoot: ShadowRoot, code: Code): void => {
  if (
    code.css &&
    // style not injected
    Array.from(shadowRoot.childNodes).every(
      (element) => element.nodeName !== "STYLE"
    )
  ) {
    const style = h("style", { innerHTML: code.css });

    shadowRoot.appendChild(style);
  }
};

export const injectScript = (
  id: string,
  shadowRoot: ShadowRoot,
  code: Code
): void => {
  const scriptText = code.getScript();

  if (
    scriptText &&
    // style not injected
    Array.from(shadowRoot.childNodes).every(
      (element) => element.nodeName !== "SCRIPT"
    )
  ) {
    const script = document.createElement("script");

    script.appendChild(
      document.createTextNode(
        // here we are fixing `document` variable back to shadowDOM
        `{const document=window.document.querySelector('#${id} .code-demo-container').shadowRoot;\n${scriptText}}`
      )
    );
    shadowRoot.appendChild(script);
  }
};
