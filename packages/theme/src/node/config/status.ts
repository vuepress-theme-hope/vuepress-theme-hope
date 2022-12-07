import type { App } from "@vuepress/core";
import type { ThemeOptions } from "../../shared/index.js";

export interface ThemeStatus {
  autoExcerpt: number | false;
  enableBlog: boolean;
  enableEncrypt: boolean;
  enableSlide: boolean;
  enableReadingTime: boolean;
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
    autoExcerpt:
      typeof plugins.blog === "object"
        ? typeof plugins.blog.autoExcerpt === "number"
          ? plugins.blog.autoExcerpt
          : plugins.blog.autoExcerpt
          ? 200
          : false
        : false,
    enableBlog: Boolean(plugins.blog),
    enableEncrypt: Boolean(
      themeOptions.encrypt &&
        ("admin" in themeOptions.encrypt || "config" in themeOptions.encrypt)
    ),
    enableSlide: Boolean(plugins.mdEnhance && plugins.mdEnhance.presentation),
    enableReadingTime: plugins.readingTime !== false,
    hasMultipleLanguages: Object.keys(locales).length > 1,
    supportPageview: Boolean(
      plugins.comment && plugins.comment.provider === "Waline"
    ),
  };
};
