import type { HopeThemeOptions } from "../shared";

export interface ThemeStatus {
  enableBlog: boolean;
  enableEncrypt: boolean;
  enableSlide: boolean;
  enableVisitor: boolean;
}

export const getStatus = (themeOptions: HopeThemeOptions): ThemeStatus => {
  const { plugins = {} } = themeOptions;

  return {
    enableBlog: Boolean(plugins.blog),
    enableEncrypt: Boolean(
      themeOptions.encrypt &&
        ("admin" in themeOptions.encrypt || "config" in themeOptions.encrypt)
    ),
    enableSlide: Boolean(
      plugins.mdEnhance &&
        (plugins.mdEnhance.enableAll || plugins.mdEnhance.presentation)
    ),
    enableVisitor: Boolean(
      plugins.comment && plugins.comment.provider === "Waline"
    ),
  };
};
