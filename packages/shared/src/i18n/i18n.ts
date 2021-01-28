import {
  langs,
  lang2PathConfig,
  path2langConfig,
  localesConfig,
} from "./config";
import type { Langs, LangPaths, HopeThemeLocaleConfigItem } from "./types";

const reportStatus: Record<string, boolean> = {};

/** Check if the lang is supported */
export const checkLang = (lang: Langs): boolean => langs.includes(lang);

/** Get path from language */
export const lang2Path = (lang = ""): LangPaths | "/" => {
  if (lang2PathConfig[lang as Langs]) return lang2PathConfig[lang as Langs];

  console.error(`${lang} has no path config, and will return '/' instead.`);

  return "/";
};

/** Get language from path */
export const path2Lang = (path = ""): Langs => {
  if (path2langConfig[path as LangPaths])
    return path2langConfig[path as LangPaths];

  console.error(
    `${path} isn’t assign with a lang, and will return 'en-US' instead.`
  );

  return "en-US";
};

/** Get locate of certain language */
export const getLocale = (lang: string): HopeThemeLocaleConfigItem => {
  if (localesConfig[lang as Langs]) return localesConfig[lang as Langs];

  if (!reportStatus[lang]) {
    console.warn(
      `${lang} locates config is missing, and will return 'en-US' instead.
You can contribute to https://github.com/Mister-Hope/vuepress-theme-hope/blob/master/packages/shared/shared/i18n.json.
Note: This warning will be shown only once.`
    );
    reportStatus[lang] = true;
  }

  return localesConfig["en-US"];
};

/** Get Default ThemeLocale */
export const getDefaultLocale = (): HopeThemeLocaleConfigItem =>
  localesConfig["en-US"];
