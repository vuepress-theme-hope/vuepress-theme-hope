import {
  isLinkHttp,
  removeEndingSlash,
  removeLeadingSlash,
} from "@vuepress/shared";
import matter from "gray-matter";
import { Logger, isAbsoluteUrl, isUrl, md2text } from "vuepress-shared/node";

import type { App, SiteLocaleConfig } from "@vuepress/core";
import type { ExtendPage, SeoOptions } from "../shared/index.js";

export const logger = new Logger("vuepress-plugin-seo2");

export interface LocaleConfig {
  localePath: string;
  lang: string;
}

export const getLocales = (
  lang: string,
  locales: SiteLocaleConfig
): LocaleConfig[] =>
  Object.entries(locales)
    .map(([localePath, value]) => ({ localePath, lang: value.lang }))
    .filter(
      (item): item is LocaleConfig =>
        typeof item.lang === "string" && item.lang !== lang
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

export const extractContent = (content: string): string =>
  md2text(
    matter(content)
      .content.trim()
      // remove first heading1 as title
      .replace(/^# (.*)$/gm, "")
  )
    // convert link breaks into spaces
    .replace(/(?:\r?\n)+/g, " ")
    // convert 2 or more spaces into 1
    .replace(/ +/g, " ")
    // trim
    .trim();
