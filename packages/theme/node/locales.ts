import { path2Lang } from "@mr-hope/vuepress-shared";

import type { ResolvedHopeVuePressConfig } from "../types";

export const resolveLocales = (config: ResolvedHopeVuePressConfig): void => {
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

    locales[path] = { lang: path2Lang(path), ...(locales[path] || {}) };
  });
};
