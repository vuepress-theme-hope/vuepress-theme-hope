import { isPlainObject, keys, values } from "@vuepress/helper";
import type { App } from "vuepress/core";

import type { ThemeOptions } from "../../shared/index.js";

export interface ThemeStatus {
  enableBlog: boolean;
  enableCatalog: boolean;
  enableEncrypt: boolean;
  enableSlide: boolean;
  enableReadingTime: boolean;
  blogType: { key: string; path: string | false }[];
  hasMultipleLanguages: boolean;
  hasRepo: boolean;
}

/** @private */
export const getThemeStatus = (
  app: App,
  themeOptions: ThemeOptions,
): ThemeStatus => {
  const { locales } = app.options;
  const { locales: themeLocales = {}, plugins = {} } = themeOptions;

  return {
    enableCatalog: plugins.catalog !== false,
    enableBlog: Boolean(plugins.blog),
    enableEncrypt:
      isPlainObject(themeOptions.encrypt) &&
      ("admin" in themeOptions.encrypt || "config" in themeOptions.encrypt),
    enableSlide: Boolean(plugins.mdEnhance && plugins.mdEnhance.revealJs),
    enableReadingTime: plugins.readingTime !== false,
    blogType: isPlainObject(plugins.blog)
      ? (plugins.blog?.type
          ?.map(({ key, path = `/${key}/` }) => ({
            key,
            path: path ?? `/${key}/`,
          }))
          .filter(({ path }) => Boolean(path)) ?? [])
      : [],
    hasMultipleLanguages: keys(locales).length > 1,
    hasRepo:
      "repo" in themeOptions ||
      values(themeLocales).some(({ repo }) => Boolean(repo)),
  };
};
