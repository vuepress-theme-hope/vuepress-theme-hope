import { path2Lang } from "@mr-hope/vuepress-shared";

import type { HopeLang } from "@mr-hope/vuepress-shared";
import type { ResolvedHopeVuePressConfig } from "../types";

export const resolveLocales = (
  config: ResolvedHopeVuePressConfig,
  rootLang: HopeLang
): void => {
  // ensure locales config
  if (!config.locales) config.locales = {};

  const { locales } = config;

  // set locate for base
  locales["/"] = {
    lang: rootLang,
    ...(locales["/"] || {}),
  };

  // handle other languages
  Object.keys(config.themeConfig.locales).forEach((path) => {
    if (path === "/") return;

    locales[path] = { lang: path2Lang(path), ...(locales[path] || {}) };
  });
};
