import {
  langs,
  lang2PathConfig,
  path2langConfig,
  localesConfig,
} from "./config";
import type { Context } from "@mr-hope/vuepress-types";
import type {
  HopeLang,
  HopeLangPath,
  HopeThemeLocaleConfigItem,
} from "./types";

const reportStatus: Record<string, boolean> = {};

export const showLangError = (lang: string): void => {
  if (!reportStatus[lang]) {
    console.warn(
      `${lang} locates config is missing, and will return 'en-US' instead.
You can contribute to https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/v1/packages/shared/src/i18n/config.ts and other 'i18n.ts' in this repository.
Note: This warning will be shown only once.`
    );
    reportStatus[lang] = true;
  }
};

/** Check if the lang is supported */
export const checkLang = (lang: string | undefined): boolean => {
  const result = langs.includes(lang as unknown as HopeLang);

  return result;
};

/** Get language of root directory */
export const getRootLang = (context: Context): HopeLang => {
  // infer from siteLocale
  const siteLocales = context.siteConfig.locales;

  if (siteLocales?.["/"] && checkLang(siteLocales["/"]?.lang))
    return siteLocales["/"].lang as HopeLang;

  // infer from themeLocale
  const themeLocales = context.themeConfig.locales;

  if (themeLocales?.["/"] && checkLang(themeLocales["/"]?.lang))
    return themeLocales["/"].lang as HopeLang;

  showLangError("root");

  return "en-US";
};

/** Get the infer language path from root directory language */
export const getRootLangPath = (context: Context): HopeLangPath =>
  lang2PathConfig[getRootLang(context)];

/** Get path from language */
export const lang2Path = (lang = ""): HopeLangPath | "/" => {
  if (lang in lang2PathConfig) return lang2PathConfig[lang as HopeLang];

  console.error(`${lang} has no path config, and will return '/' instead.`);

  return "/";
};

/** Get language from path */
export const path2Lang = (path = ""): HopeLang => {
  if (path in path2langConfig) return path2langConfig[path as HopeLangPath];

  console.error(
    `${path} isn’t assign with a lang, and will return 'en-US' instead.`
  );

  return "en-US";
};

/** Get locate of certain language */
export const getLocale = (lang: string): HopeThemeLocaleConfigItem => {
  if (lang in localesConfig) return localesConfig[lang as HopeLang];

  showLangError(lang);

  return localesConfig["en-US"];
};

/** Get Default ThemeLocale */
export const getDefaultLocale = (): HopeThemeLocaleConfigItem =>
  localesConfig["en-US"];
