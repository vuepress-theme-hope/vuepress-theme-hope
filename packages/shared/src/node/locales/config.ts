/* eslint-disable @typescript-eslint/naming-convention */
import type { HopeLang } from "./types.js";

export const lang2PathConfig = {
  "de-AT": "/de-at/",
  "de-DE": "/de/",
  "en-US": "/en/",
  "es-ES": "/es/",
  "fi-FI": "/fi/",
  "fr-FR": "/fr/",
  "ja-JP": "/ja/",
  "ko-KR": "/ko/",
  "pl-PL": "/pl/",
  "pt-BR": "/br/",
  "ru-RU": "/ru/",
  "sk-SK": "/sk/",
  "tr-TR": "/tr/",
  "uk-UA": "/uk/",
  "vi-VN": "/vi/",
  "zh-CN": "/zh/",
  "zh-TW": "/zh-tw/",
};

export const supportedLangs = Object.keys(lang2PathConfig);

export const path2langConfig = Object.fromEntries(
  (supportedLangs as HopeLang[]).map((lang) => [lang2PathConfig[lang], lang])
);
