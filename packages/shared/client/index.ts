import config from "../config/i18n.json";
import { Langs, LangPaths, HopeLangI18nConfig } from "../types";

const reportStatus: Record<string, boolean> = {};

/** Supported lang codes */
export const langs = config.langs as Langs[];

const lang2pathConfig = config.lang2Path as Record<Langs, LangPaths>;

const path2langConfig = config.path2lang as Record<LangPaths, Langs>;

export const checkLang = (lang: string): boolean =>
  langs.includes(lang as Langs);

/** get path from language */
export const lang2path = (lang: string): LangPaths | "/" => {
  if (lang2pathConfig[lang as Langs]) return lang2pathConfig[lang as Langs];

  console.error(
    `${lang} has no path config, and will return '/' instead.
You can contribute to https://github.com/Mister-Hope/vuepress-theme-hope/blob/v1/packages/shared/shared/i18n.json`
  );

  return "/";
};

/** get language from path */
export const path2lang = (path: string): Langs => {
  if (path2langConfig[path as LangPaths])
    return path2langConfig[path as LangPaths];

  console.error(
    `${path} isn’t assign with a lang, and will return 'en-US' instead.
You can contribute to https://github.com/Mister-Hope/vuepress-theme-hope/blob/v1/packages/shared/shared/i18n.json`
  );

  return "en-US";
};

/** Muti language config */
export const localesConfig = config.locales as Record<
  Langs,
  HopeLangI18nConfig
>;

/** Get locate of certain language */
export const getLocale = (lang: string): HopeLangI18nConfig => {
  if (localesConfig[lang as Langs]) return localesConfig[lang as Langs];

  if (!reportStatus[lang]) {
    console.warn(
      `${lang} locates config is missing, and will return 'en-US' instead.
You can contribute to https://github.com/Mister-Hope/vuepress-theme-hope/blob/v1/packages/shared/shared/i18n.json.
Note: This warning will be shown only once.`
    );
    reportStatus[lang] = true;
  }

  return localesConfig["en-US"];
};

export const getDefaultLocale = (): HopeLangI18nConfig =>
  localesConfig["en-US"];

export const capitalize = (word: string): string =>
  `${word.charAt(0).toUpperCase()}${word.slice(1)}`;

export const strictCapitalize = (word: string): string =>
  `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`;
