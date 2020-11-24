import { ResolvedHopeVuepressConfig } from "../types";
import { path2lang } from "@mr-hope/vuepress-utils";

export const resolveLocales = (config: ResolvedHopeVuepressConfig): void => {
  // ensure locales config
  if (!config.locales) config.locales = {};

  const { baseLang = "en-US" } = config.themeConfig;
  const { locales } = config;

  // set locate for base
  locales["/"] = {
    lang: baseLang,
    ...(locales["/"] || {}),
  };

  // handle other languages
  Object.keys(config.themeConfig.locales).forEach((path) => {
    if (path === "/") return;

    locales[path] = { lang: path2lang(path), ...(locales[path] || {}) };
  });
};
