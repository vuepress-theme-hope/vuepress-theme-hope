import type { HopeThemeOptions } from "../shared/index.js";

export interface ThemeStatus {
  enableBlog: boolean;
  enableEncrypt: boolean;
  enableSlide: boolean;
  supportPageview: boolean;
}

export const getStatus = (themeOptions: HopeThemeOptions): ThemeStatus => {
  const { plugins = {} } = themeOptions;

  return {
    enableBlog: Boolean(plugins.blog),
    enableEncrypt: Boolean(
      themeOptions.encrypt &&
        ("admin" in themeOptions.encrypt || "config" in themeOptions.encrypt)
    ),
    enableSlide: Boolean(plugins.mdEnhance && plugins.mdEnhance.presentation),
    supportPageview: Boolean(
      plugins.comment && plugins.comment.provider === "Waline"
    ),
  };
};
