import { LocaleData } from "@vuepress/core";

export const lang2PathConfig = {
  "en-US": "/en/",
  "zh-CN": "/zh/",
  "zh-TW": "/zh-tw/",
  "de-AT": "/de/",
  "vi-VN": "/vi/",
};

export const supportedLangs = Object.keys(lang2PathConfig);

export const path2langConfig = Object.fromEntries(
  (supportedLangs as HopeLang[]).map((lang) => [lang2PathConfig[lang], lang])
);

/** Types for supported lang codes */
export type HopeLang = keyof typeof lang2PathConfig;

export type ResolvedLocaleConfig<T extends LocaleData = LocaleData> = Record<
  string,
  T
>;
