import { Logger } from "@mr-hope/vuepress-shared";

export const logger = new Logger("vuepress-plugin-feed2");

export const compareDate = (
  dateA: Date | string | undefined,
  dateB: Date | string | undefined
): number => {
  if (!dateA || !(dateA instanceof Date)) return 1;
  if (!dateB || !(dateB instanceof Date)) return -1;

  return dateB.getTime() - dateA.getTime();
};

export const resolveHTML = (html: string): string =>
  html
    // remove html class
    .replace(/ class=".*?"/gu, "")
    // remove v-pre
    .replace(/ v-pre/gu, "")
    // remove anchor
    .replace(/<a href="#.*?">.*?<\/a>/gu, "")
    // remove html comment
    .replace(/(<!--.*?--!?>)|(<!--[\S\s]+?--!?>)|(<!--[\S\s]*?$)/gu, "")
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
      "<i>Content not supported</i>"
    )
    // remove tex
    .replace(/<math[\s\S]*?\/math>/gu, "<i>Content not supported</i>");

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

export const FEED_GENERATOR = "vuepress-plugin-feed2";
