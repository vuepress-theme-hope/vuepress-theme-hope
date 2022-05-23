/* eslint-disable @typescript-eslint/naming-convention */
import type { HopeLang } from "./types";

export const lang2PathConfig = {
  "en-US": "/en/",
  "zh-CN": "/zh/",
  "zh-TW": "/zh-tw/",
  "de-AT": "/de/",
  "vi-VN": "/vi/",
  "ru-RU": "/ru/",
  "uk-UA": "/uk/",
  "pt-BR": "/br/",
  "pl-PL": "/pl/",
  "fr-FR": "/fr/",
  "sk-SK": "/sk/",
  "es-ES": "/es/",
};

export const supportedLangs = Object.keys(lang2PathConfig);

export const path2langConfig = Object.fromEntries(
  (supportedLangs as HopeLang[]).map((lang) => [lang2PathConfig[lang], lang])
);
