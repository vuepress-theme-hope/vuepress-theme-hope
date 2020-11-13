import {
  Langs,
  LangPaths,
  lang2PathConfig,
  langs,
  localesConfig,
  path2langConfig,
} from "./config";
import { HopeLangI18nConfig } from "../../types";

const reportStatus: Record<string, boolean> = {};

export const checkLang = (lang: string): boolean =>
  langs.includes(lang as Langs);

/** get path from language */
export const lang2path = (lang: string): LangPaths | "/" => {
  if (lang2PathConfig[lang as Langs]) return lang2PathConfig[lang as Langs];

  console.error(
    `${lang} has no path config, and will return '/' instead.
You can contribute to https://github.com/Mister-Hope/vuepress-theme-hope/blob/master/packages/shared-utils/lib/i18n/config.ts`
  );

  return "/";
};

/** get language from path */
export const path2lang = (path: string): Langs => {
  if (path2langConfig[path as LangPaths])
    return path2langConfig[path as LangPaths];

  console.error(
    `${path} isn’t assign with a lang, and will return 'en-US' instead.
You can contribute to https://github.com/Mister-Hope/vuepress-theme-hope/blob/master/packages/shared-utils/lib/i18n/config.ts`
  );

  return "en-US";
};

/** Get locate of certain language */
export const getLocale = (lang: string): HopeLangI18nConfig => {
  if (localesConfig[lang as Langs]) return localesConfig[lang as Langs];

  if (!reportStatus[lang]) {
    console.warn(
      `${lang} locates config is missing, and will return 'en-US' instead.
You can contribute to https://github.com/Mister-Hope/vuepress-theme-hope/blob/master/packages/shared-utils/lib/i18n/config.ts.
Note: This warning will be shown only once.`
    );
    reportStatus[lang] = true;
  }

  return localesConfig["en-US"];
};

export const getDefaultLocale = (): HopeLangI18nConfig =>
  localesConfig["en-US"];
