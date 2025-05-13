import { isPlainObject, isString, keys, values } from "@vuepress/helper";
import type { App } from "vuepress/core";

import type { ThemeOptions } from "../../shared/index.js";

export interface BlogTypeInfo {
  key: string;
  path: string;
}

export interface ThemeStatus {
  enableBlog: boolean;
  enableCatalog: boolean;
  enableEncrypt: boolean;
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
    enableCatalog: plugins.catalog !== false,
    enableBlog: Boolean(plugins.blog),
    enableEncrypt:
      isPlainObject(themeOptions.encrypt) &&
      (Boolean(themeOptions.encrypt.admin) ||
        Boolean(themeOptions.encrypt.config)),
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
