import { Logger, isAbsoluteUrl, isUrl } from "@mr-hope/vuepress-shared";
import type { App } from "@vuepress/core";
import type { SiteLocaleConfig } from "@vuepress/shared";
import type { ExtendPage, SeoOptions } from "../shared";

export const logger = new Logger("vuepress-plugin-seo2");

export const getLocales = (lang: string, locales: SiteLocaleConfig): string[] =>
  Object.entries(locales)
    .map(([, value]) => value.lang)
    .filter(
      (item): item is string => typeof item === "string" && item !== lang
    );

export const getCover = (
  page: ExtendPage,
  options: SeoOptions,
  app: App
): string | null => {
  const { banner, cover } = page.frontmatter;

  if (banner) {
    if (isAbsoluteUrl(banner))
      return resolveUrl(options.hostname, app.options.base, banner);

    if (isUrl(banner)) return banner;
  }

  if (cover) {
    if (isAbsoluteUrl(cover))
      return resolveUrl(options.hostname, app.options.base, cover);

    if (isUrl(cover)) return cover;
  }

  return null;
};

export const getImages = (
  page: ExtendPage,
  options: SeoOptions,
  app: App
): string[] => {
  const result = /!\[.*?\]\((.*?)\)/giu.exec(page.content);

  if (result) {
    return result
      .map(([, link]) => {
        if (isAbsoluteUrl(link))
          return resolveUrl(options.hostname, app.options.base, link);

        if (isUrl(link)) return link;

        return null;
      })
      .filter((item): item is string => item !== null);
  }

  return [];
};

export const resolveUrl = (
  hostname: string,
  base: string,
  url: string
): string =>
  `${hostname.match(/https?:\/\//) ? "" : "https://"}${hostname.replace(
    /\/$/u,
    ""
  )}${base}${url.replace(/^\//u, "")}`;

export const stripTags = (content = ""): string =>
  content
    // remove html tags
    .replace(/<\/?.+?\/?>/g, "");

export const md2text = (content?: string): string =>
  content
    ? stripTags(content)
        // remove img
        .replace(/!\[(.*?)\]\(.*?\)/gm, "")
        // remove code blocks
        .replace(/```([\s\S]*?)```/g, "")
        // remove custom container end
        .replace(/^\s*:::\s*$/gm, "")
        // remove custom container start
        .replace(/^\s*:::\s*(.+?)(?:\s+(.*))?$/gm, "$2")
        // remove heading1
        .replace(/^# (.*)$/gm, "$1")
        // convert other headings to text
        .replace(/^#{1,6} (.*)$/gm, "$1")
        // convert unordered lists to text with comma
        .replace(/^\s*[-*+] (.*)$/gm, "$1; ")
        // convert blockquotes with quotes
        .replace(/^\s*>+(.*)$/gm, '"$1"')
        // convert links to text
        .replace(/(^|[^\\])\[(.*?)\]\(.*?\)/gm, "$1$2")
        // convert inline code
        .replace(/`{1,2}([^`])(.*?)`{1,2}/g, "$1$2")
        // just remove delete lines
        .replace(/~~(.*?)~~/g, "")
        // remove bold or italic
        .replace(/(^|[^\\])([*|_]{1,2})(.*?)([^\\])\2/gm, "$1$3$4")
        // remove html tags
        .replace(/<\/?.+?\/?>/g, "")
        // trim lines
        .split("\n")
        .map((line) => line.trim())
        .join("\n")
        // covert link breaks into spaces
        .replace(/(?:\r?\n)+/g, " ")
        // covert 2 or more spaces into 1
        .replace(/ +/g, " ")
        // trim
        .trim()
    : "";
