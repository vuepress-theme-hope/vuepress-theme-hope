import type { App } from "@vuepress/core";
import type { HopeThemeOptions } from "../shared/index.js";

export interface ThemeStatus {
  enableBlog: boolean;
  enableEncrypt: boolean;
  enableSlide: boolean;
  hasMultipleLanguages: boolean;
  supportPageview: boolean;
}

export const getStatus = (
  app: App,
  themeOptions: HopeThemeOptions
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
    hasMultipleLanguages: Object.keys(locales).length > 1,
    supportPageview: Boolean(
      plugins.comment && plugins.comment.provider === "Waline"
    ),
  };
};
