import { type App, type Page } from "@vuepress/core";
import {
  Logger,
  entries,
  isAbsoluteUrl,
  isLinkHttp,
  isString,
  isUrl,
  removeEndingSlash,
  removeLeadingSlash,
} from "vuepress-shared/node";

import { type SeoOptions } from "./options.js";
import { type ExtendPage } from "./typings/index.js";

export const PLUGIN_NAME = "vuepress-plugin-seo2";

export const logger = new Logger(PLUGIN_NAME);

export interface AlternateInfo {
  path: string;
  lang: string;
}

export const getAlternateInfo = (
  { lang, path, pathLocale }: Page,
  { pages, siteData }: App
): AlternateInfo[] =>
  entries(siteData.locales)
    .map(([localePath, { lang }]) => ({
      path: `${localePath}${path.replace(pathLocale, "")}`,
      lang,
    }))
    .filter(
      (item): item is AlternateInfo =>
        isString(item.lang) &&
        item.lang !== lang &&
        pages.some(({ path }) => path === item.path)
    );

export const getCover = (
  { frontmatter }: ExtendPage,
  { options: { base } }: App,
  { hostname }: SeoOptions
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
  { options: { base } }: App,
  { hostname }: SeoOptions
): string[] => {
  const result = /!\[.*?\]\((.*?)\)/giu.exec(content);

  if (result)
    return result
      .map(([, link]) => {
        if (isAbsoluteUrl(link)) return resolveUrl(hostname, base, link);

        if (isUrl(link)) return link;

        return null;
      })
      .filter((item): item is string => item !== null);

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
