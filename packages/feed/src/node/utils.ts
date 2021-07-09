import { black, blue } from "chalk";

export const wait = (message: string): void =>
  console.log(blue("Feed:"), black.bgYellowBright("wait"), message);

export const warn = (message: string): void =>
  console.log(blue("Feed:"), black.bgYellow("warn"), message);

export const error = (message: string): void =>
  console.log(blue("Feed:"), black.bgRed("Error"), message);

export const success = (message: string): void =>
  console.log(blue("Feed:"), black.bgGreen("Success"), message);

export const resolveHTML = (html: string): string =>
  html
    // remove html class
    .replace(/ class=".*?"/gu, "")
    // remove v-pre
    .replace(/ v-pre/gu, "")
    // remove anchor
    .replace(/<a href="#.*?">.*?<\/a>/gu, "")
    // remove html comment
    .replace(/(<!--.*?-->)|(<!--[\S\s]+?-->)|(<!--[\S\s]*?$)/gu, "")
    // remove OutboundLink
    .replace(/<OutboundLink ?\/>/gu, "")
    // resolve RouterLink
    .replace(
      /<RouterLink to="(.*?)">(.*?)<\/RouterLink>/gu,
      '<a href="$1">$2</a>'
    )
    // remove self-closed tags
    .replace(/<(?:a|div|span)[^>]*?\/>/gu, "")
    // remove other related tags
    .replace(
      /<(Badge|FlowChart|Presentation).*?(?:>.*?<\/\1>|\/>)/gu,
      "<i>Not supported content</i>"
    )
    // remove tex
    .replace(/<math[\s\S]*?\/math>/gu, "<i>Not supported content</i>");

/**
 * check if string is a valid url
 */
export const isUrl = (test: string): boolean => {
  if (typeof test !== "string" || test === "") return false;

  // url Math
  const result = /^(?:\w+:)?\/\/(\S+)$/u.exec(test);

  if (!result) return false;

  const address = result[1];

  if (!address) return false;

  return (
    // address with localhost
    /^localhost[:?\d]*(?:[^:?\d]\S*)?$/u.test(address) ||
    // address without localhost
    /^[^\s.]+\.\S{2,}$/u.test(address)
  );
};

export const isAbsoluteUrl = (test: string): boolean => test.startsWith("/");

export const resolveUrl = (hostname: string, base = "", path = ""): string =>
  `${hostname}${
    // make sure base starts and ends with '/'
    base.replace(/^\/?/u, "/").replace(/\/?$/u, "/")
  }${
    // make sure path does not start with '/'
    path.replace(/^\//u, "")
  }`;

export const getImageMineType = (ext = ""): string =>
  `image/${
    ext === "jpg"
      ? "jpeg"
      : ext === "svg"
      ? "svg+xml"
      : ext === "jpeg" ||
        ext === "png" ||
        ext === "bmp" ||
        ext === "gif" ||
        ext === "webp"
      ? ext
      : ""
  }`;

/**
 * @see https://stackoverflow.com/questions/223652/is-there-a-way-to-escape-a-cdata-end-token-in-xml
 */
export const encodeCDATA = (content: string): string =>
  content.replace(/]]>/g, "]]]]><![CDATA[>");

export const encodeXML = (content: string): string =>
  content
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export const generator = "@mr-hope/vuepress-plugin-feed";
