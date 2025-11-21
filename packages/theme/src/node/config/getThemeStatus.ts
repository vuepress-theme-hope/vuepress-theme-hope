import { isPlainObject, isString, keys, values } from "@vuepress/helper";
import type { App } from "vuepress/core";

import type { ThemeOptions } from "../typings/index.js";

export interface BlogTypeInfo {
  key: string;
  path: string;
}

export interface ThemeStatus {
  enableBlog: boolean;
  enableCatalog: boolean;
  enableEncrypt: boolean;
  enableIcon: boolean;
  enableReadingTime: boolean;
  blogTypes: BlogTypeInfo[];
  isI18nProject: boolean;
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
    enableBlog: Boolean(plugins.blog),
    enableCatalog: plugins.catalog !== false,
    enableEncrypt:
      isPlainObject(themeOptions.encrypt) &&
      (Boolean(themeOptions.encrypt.admin) ||
        Boolean(themeOptions.encrypt.config)),
    enableIcon: plugins.icon !== false,
    enableReadingTime: plugins.readingTime !== false,
    blogTypes: isPlainObject(plugins.blog)
      ? (plugins.blog.type
          ?.map(({ key, path = `/${key}/` }) => ({
            key,
            path,
          }))
          .filter<BlogTypeInfo>((item): item is BlogTypeInfo =>
            isString(item.path),
          ) ?? [])
      : [],
    isI18nProject: keys(locales).length > 1,
    hasRepo:
      Boolean(themeOptions.repo) ||
      values(themeLocales).some(({ repo }) => Boolean(repo)),
  };
};
