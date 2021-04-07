import {
  checkLang,
  deepAssignReverse,
  showLangError,
} from "@mr-hope/vuepress-shared";
import { resolveLocales } from "./locales";
import { resolveThemeConfig } from "./themeConfig";

import type { HopeLang } from "@mr-hope/vuepress-shared";
import type { HopeVuePressConfig, ResolvedHopeVuePressConfig } from "../types";

const defaultConfig = {
  base: process.env.VuePress_BASE || "/",

  temp: "./node_modules/.temp",

  theme: "hope",

  themeConfig: { locales: {} },

  evergreen: true,
};

const getRootLang = (config: ResolvedHopeVuePressConfig): HopeLang => {
  // infer from siteLocale
  const siteLocales = config.locales;

  if (siteLocales?.["/"] && checkLang(siteLocales["/"]?.lang))
    return siteLocales["/"].lang as HopeLang;

  // infer from themeLocale
  const themeLocales = config.locales;

  if (themeLocales?.["/"] && checkLang(themeLocales["/"]?.lang))
    return themeLocales["/"].lang as HopeLang;

  showLangError("root");

  return "en-US";
};

export const config = (
  config: HopeVuePressConfig
): ResolvedHopeVuePressConfig => {
  // merge default config
  deepAssignReverse(defaultConfig, config);

  const resolvedConfig = config as ResolvedHopeVuePressConfig;
  const rootLang = getRootLang(resolvedConfig);

  resolveThemeConfig(resolvedConfig.themeConfig, rootLang);
  resolveLocales(resolvedConfig, rootLang);

  return resolvedConfig;
};
