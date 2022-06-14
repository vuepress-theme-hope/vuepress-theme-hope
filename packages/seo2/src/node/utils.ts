import {
  isLinkHttp,
  removeEndingSlash,
  removeLeadingSlash,
} from "@vuepress/shared";
import { Logger, isAbsoluteUrl, isUrl } from "vuepress-shared";

import type { App, SiteLocaleConfig } from "@vuepress/core";
import type { ExtendPage, SeoOptions } from "../shared";

export const logger = new Logger("vuepress-plugin-seo2");

export const getLocales = (lang: string, locales: SiteLocaleConfig): string[] =>
  Object.entries(locales)
    .map(([, value]) => value.lang)
    .filter(
      (item): item is string => typeof item === "string" && item !== lang
    );

export const getCover = (
  { frontmatter }: ExtendPage,
  { hostname }: SeoOptions,
  { options: { base } }: App
): string | null => {
  const { banner, cover } = frontmatter;

  if (banner) {
    if (isAbsoluteUrl(banner)) return resolveUrl(hostname, base, banner);

    if (isUrl(banner)) return banner;
  }

  if (cover) {
    if (isAbsoluteUrl(cover)) return resolveUrl(hostname, base, cover);

    if (isUrl(cover)) return cover;
  }

  return null;
};

export const getImages = (
  { content }: ExtendPage,
  { hostname }: SeoOptions,
  { options: { base } }: App
): string[] => {
  const result = /!\[.*?\]\((.*?)\)/giu.exec(content);

  if (result) {
    return result
      .map(([, link]) => {
        if (isAbsoluteUrl(link)) return resolveUrl(hostname, base, link);

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
  `${
    isLinkHttp(hostname)
      ? removeEndingSlash(hostname)
      : `https://${removeEndingSlash(hostname)}`
  }${base}${removeLeadingSlash(url)}`;

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
