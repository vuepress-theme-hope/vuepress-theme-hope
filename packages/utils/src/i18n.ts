import {
  Langs,
  LangPaths,
  HopeLangI18nConfig,
  PluginI18nConfig,
} from "@mr-hope/vuepress-shared";
import config = require("@mr-hope/vuepress-shared/lib/config/i18n.json");

/** Supported lang codes */
export const langs = config.langs as Langs[];

/** Muti language config for plugins */
export const i18n = config.plugins as PluginI18nConfig;

const lang2pathConfig = config.lang2Path as Record<Langs, LangPaths>;

const path2langConfig = config.path2lang as Record<LangPaths, Langs>;

export const checkLang = (lang: string): boolean =>
  langs.includes(lang as Langs);

/** get path from language */
export const lang2path = (lang: string): LangPaths | "/" => {
  if (lang2pathConfig[lang as Langs]) return lang2pathConfig[lang as Langs];

  console.error(
    `${lang} has no path config, and will return '/' instead.
You can contribute to https://github.com/Mister-Hope/vuepress-theme-hope/blob/v1/packages/shared/config/i18n.json`
  );

  return "/";
};

/** get language from path */
export const path2lang = (path: string): Langs => {
  if (path2langConfig[path as LangPaths])
    return path2langConfig[path as LangPaths];

  console.error(
    `${path} isn’t assign with a lang, and will return 'en-US' instead.
You can contribute to https://github.com/Mister-Hope/vuepress-theme-hope/blob/v1/packages/shared/config/i18n.json`
  );

  return "en-US";
};

/** Muti language config */
const localesConfig = config.locales as Record<Langs, HopeLangI18nConfig>;

/** Get locate of certain language */
export const getLocale = (lang: string): HopeLangI18nConfig => {
  if (localesConfig[lang as Langs]) return localesConfig[lang as Langs];

  console.warn(
    `${lang} locates config is missing, and will return 'en-US' instead.
You can contribute to https://github.com/Mister-Hope/vuepress-theme-hope/blob/v1/packages/shared/config/i18n.json
Note: This warning will be shown only once.`
  );

  return localesConfig["en-US"];
};
