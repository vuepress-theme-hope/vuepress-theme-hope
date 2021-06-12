import { lang2PathConfig, path2langConfig, supportedLangs } from "./config";
import type { HopeLang } from "./config";

const reportStatus: Record<string, boolean> = {};

/** Check if the lang is supported */
export const checkLang = (lang = ""): boolean => supportedLangs.includes(lang);

export const showLangError = (lang: string, plugin = ""): void => {
  if (!reportStatus[lang]) {
    console.warn(
      `${lang} locates config is missing, and will return 'en-US' instead.
${
  lang === "root"
    ? ""
    : `You can contribute to https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/v2/packages/${
        plugin || "<YOUR PLUGIN>"
      }/src/node/i18n.ts in this repository.
`
}Note: This warning will be shown only once`
    );
    reportStatus[lang] = true;
  }
};

/** Get language from path */
export const path2Lang = (path = ""): HopeLang => {
  if (path in path2langConfig) return path2langConfig[path];

  console.error(
    `${path} isn’t assign with a lang, and will return 'en-US' instead.`
  );

  return "en-US";
};

/** Get path from language */
export const lang2Path = (lang = ""): string => {
  if (lang in lang2PathConfig) return lang2PathConfig[lang as HopeLang];

  console.error(`${lang} has no path config, and will return '/' instead.`);

  return "/";
};
