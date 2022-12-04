import type { App } from "@vuepress/core";
import type { ThemeOptions } from "../../shared/index.js";

export interface ThemeStatus {
  enableAutoExcerpt: boolean;
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
    enableAutoExcerpt:
      typeof plugins.blog === "object" && Boolean(plugins.blog.autoExcerpt),
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
