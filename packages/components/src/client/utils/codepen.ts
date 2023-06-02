const ALLOWED_ATTRIBUTES = [
  "title",
  "description",
  "tags",
  "html_classes",
  "head",
  "stylesheets",
  "scripts",
];

const HTML_TYPES = [
  "html",
  "xml",
  "haml",
  "markdown",
  "slim",
  "pug",
  "application/x-slim",
];

const CSS_TYPES = [
  "css",
  "less",
  "scss",
  "sass",
  "stylus",
  "postcss",
  "text/css",
  "text/x-sass",
  "text/x-scss",
  "text/x-less",
  "text/x-styl",
];

const JS_TYPES = [
  "js",
  "javascript",
  "coffeescript",
  "livescript",
  "typescript",
  "babel",
  "text/javascript",
  "text/x-coffeescript",
  "text/x-livescript",
  "text/typescript",
];

const CUSTOM_EDITOR_TYPES: Record<string, string> = {
  vue: "js",
  flutter: "js",
};

const HOST = "https://codepen.io";

const getType = (type = ""): string =>
  HTML_TYPES.includes(type)
    ? "html"
    : CSS_TYPES.includes(type)
    ? "css"
    : JS_TYPES.includes(type)
    ? "js"
    : CUSTOM_EDITOR_TYPES[type]
    ? CUSTOM_EDITOR_TYPES[type]
    : "unknown";

interface Options {
  name?: string;
  href?: string;
  user?: string;
  "slug-hash"?: string;
  "default-tab"?: string;
  height?: number;
  class?: string;
  safe?: "true";
  type?: string;
  token?: string;
  data?: string;
  preview?: "true";
  "pen-title"?: string;
  animations?: "run" | "stop-after-5";
  [prop: string]: string | number;
}

const getUser = (result: Options, container: HTMLElement): string => {
  if (typeof result.user === "string") return result.user;

  // try to find a link in users
  for (let index = 0; index < container.children.length; index++) {
    const link = (
      (<HTMLAnchorElement>container.children[index]).href || ""
    ).match(/codepen\.(io|dev)\/(\w+)\/pen\//i);

    if (link) return link[2];
  }

  return "anon";
};

const getOptions = (container: HTMLElement): Options | null => {
  const { attributes } = container;
  const result: Options = {};

  for (let index = 0; index < attributes.length; index++) {
    const name = attributes[index].name;

    if (name.startsWith("data-"))
      result[name.replace("data-", "")] = attributes[index].value;
  }

  if (result.href) result["slug-hash"] = result.href;

  if (result.type) result["default-tab"] = result.type;
  if (result.safe)
    result.animations = "true" === result.safe ? "run" : "stop-after-5";

  if ("prefill" in result || result["slug-hash"]) {
    result.user = getUser(result, container);

    return result;
  }

  return null;
};

const encodeOptions = (options: Options): string => {
  let result = "";

  for (const key in options)
    if (key !== "prefill") {
      if (result !== "") result += "&";

      result += key + "=" + encodeURIComponent(options[key]);
    }

  return result;
};

const getActionLink = (options: Options): string => {
  const path = options.preview === "true" ? "embed/preview" : "embed";

  if ("prefill" in options) return [HOST, path, "prefill"].join("/");

  let slugHash = options["slug-hash"];

  if (!slugHash) throw new Error("slug-hash is required");

  if (options.token) slugHash += "/" + options.token;

  return [
    HOST,
    options.user || "anon",
    path,
    slugHash + "?" + encodeOptions(options),
  ]
    .join("/")
    .replace(/\/\//g, "//");
};

const createElement = <K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  attributes: Record<string, string>
): HTMLElementTagNameMap[K] => {
  const element = document.createElement<K>(tagName);

  for (const attribute in attributes)
    Object.prototype.hasOwnProperty.call(attributes, attribute) &&
      element.setAttribute(attribute, attributes[attribute]);

  return element;
};

const getData = (container: HTMLElement): string | void => {
  if (Object.hasOwn(container.dataset, "prefill")) {
    const options: Record<string, unknown> = {};

    const prefillOptions = <Record<string, unknown>>(
      JSON.parse(decodeURI(container.dataset["prefill"]!) || "{}")
    );

    for (const key in prefillOptions)
      if (ALLOWED_ATTRIBUTES.includes(key)) options[key] = prefillOptions[key];

    const elements = Array.from(
      container.querySelectorAll<HTMLElement>("[data-lang]")
    );

    elements.forEach((element) => {
      const { lang, langVersion, optionsAutoprefixer } = element.dataset;

      if (optionsAutoprefixer) options["css_prefix"] = "autoprefixer";

      const type = getType(lang);

      options[type] = element.innerText;

      if (lang !== type) options[type + "_pre_processor"] = lang;
      if (langVersion) options[type + "_version"] = langVersion;
    });

    return JSON.stringify(options);
  }
};

const generateForm = (
  options: Options,
  container: HTMLElement
): HTMLFormElement => {
  const form = createElement("form", {
    class: "codepen-embed-form",
    style: "display: none;",
    method: "post",
    action: getActionLink(options),
    target: options.name || "",
  });
  const data = getData(container);

  if (data) options.data = data;

  for (const key in options)
    if (key !== "prefill")
      form.append(
        createElement("input", {
          type: "hidden",
          name: key,
          value: options[key].toString(),
        })
      );

  return form;
};

const getIframe = (options: Options): HTMLIFrameElement => {
  const attribute: Record<string, string> = {
    allowfullscreen: "true",
    allowpaymentrequest: "true",
    allowTransparency: "true",
    class: "cp_embed_iframe " + (options.class || ""),
    frameborder: "0",
    height: (options.height || 300).toString(),
    width: "100%",
    name: options.name || "CodePen Embed",
    scrolling: "no",
    src: getActionLink(options),
    style: "width: 100%; overflow:hidden; display:block;",
    title: options["pen-title"] || "CodePen Embed",
  };

  if (!("prefill" in options)) attribute["loading"] = "lazy";

  if (options["slug-hash"])
    attribute["id"] = `code-pen-embed-${options["slug-hash"].replace(
      "/",
      "_"
    )}`;

  return createElement("iframe", attribute);
};

const appendFragment = (
  container: HTMLElement,
  docFragment: DocumentFragment
): HTMLElement => {
  if (container.parentNode) {
    const div = document.createElement("div");

    div.className = "codepen-embed-wrapper";
    div.append(docFragment);

    container.parentNode.replaceChild(div, container);

    return div;
  }

  container.append(docFragment);

  return container;
};

const generateFormWrapper = (
  options: Options,
  container: HTMLElement
): void => {
  const docFragment = document.createDocumentFragment();
  let form;

  docFragment.append(getIframe(options));

  if ("prefill" in options) {
    form = generateForm(options, container);
    docFragment.append(form);
  }

  appendFragment(container, docFragment);

  if (form) form.submit();
};

let idIndex = 1;

const renderCodePens = (selector = ".codepen"): void => {
  const containers = document.querySelectorAll<HTMLElement>(selector);

  for (let index = 0; index < containers.length; index++) {
    const container = containers[index];
    const options = getOptions(container);

    if (options) {
      options.name = `codepen-embed-${idIndex++}`;
      generateFormWrapper(options, container);
    }
  }
};

export const loadCodePens = (selector = ".codepen"): void => {
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", () => {
      renderCodePens((selector = ".codepen"));
    });
  else renderCodePens(selector);
};
