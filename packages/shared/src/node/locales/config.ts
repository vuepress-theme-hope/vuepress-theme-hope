/* eslint-disable @typescript-eslint/naming-convention */
import { type HopeLang } from "./types.js";
import { fromEntries, keys } from "../../shared/index.js";

export const lang2PathConfig = {
  "de-AT": "/de-at/",
  "de-DE": "/de/",
  "en-US": "/en/",
  "es-ES": "/es/",
  "fi-FI": "/fi/",
  "fr-FR": "/fr/",
  "hu-HU": "/hu/",
  "id-ID": "/id/",
  "ja-JP": "/ja/",
  "ko-KR": "/ko/",
  "nl-NL": "/nl/",
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

export const supportedLangs = keys(lang2PathConfig);

export const path2langConfig = fromEntries(
  (supportedLangs as HopeLang[]).map((lang) => [lang2PathConfig[lang], lang])
);
