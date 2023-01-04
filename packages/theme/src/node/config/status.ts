import { isPlainObject } from "@vuepress/shared";

import type { App } from "@vuepress/core";
import type { ThemeOptions } from "../../shared/index.js";

export interface ThemeStatus {
  enableBlog: boolean;
  enableEncrypt: boolean;
  enableSlide: boolean;
  enableReadingTime: boolean;
  blogType: { key: string; path: string }[];
  hasMultipleLanguages: boolean;
  supportPageview: boolean;
}

export const getStatus = (
  app: App,
  themeOptions: ThemeOptions
): ThemeStatus => {
  const { locales } = app.options;
  const { plugins = {} } = themeOptions;

  return {
    enableBlog: Boolean(plugins.blog),
    enableEncrypt: Boolean(
      themeOptions.encrypt &&
        ("admin" in themeOptions.encrypt || "config" in themeOptions.encrypt)
    ),
    enableSlide: Boolean(plugins.mdEnhance && plugins.mdEnhance.presentation),
    enableReadingTime: plugins.readingTime !== false,
    blogType: isPlainObject(plugins.blog)
      ? plugins.blog?.type?.map(({ key, path }) => ({
          key,
          path: path || `/${key}/`,
        })) || []
      : [],
    hasMultipleLanguages: Object.keys(locales).length > 1,
    supportPageview: Boolean(
      plugins.comment && plugins.comment.provider === "Waline"
    ),
  };
};
