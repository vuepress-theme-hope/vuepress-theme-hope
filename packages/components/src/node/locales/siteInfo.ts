import type { DefaultLocaleInfo } from "@vuepress/helper";

import type { SiteInfoLocaleData } from "../../shared/index.js";

export const siteInfoLocaleInfo: DefaultLocaleInfo<SiteInfoLocaleData> = [
  [["en", "en-US"], { source: "Source" }],
  [["zh", "zh-CN", "zh-Hans"], { source: "源代码" }],
  [["zh-TW", "zh-Hant"], { source: "源代碼" }],
  [["de", "de-DE"], { source: "Quellcode" }],
  [["de-AT"], { source: "Quellcode" }],
  [["vi", "vi-VN"], { source: "Mã nguồn" }],
  [["uk", "uk-UA"], { source: "Джерело" }],
  [["ru", "ru-RU"], { source: "Исходный код" }],
  [["pt", "pt-PT"], { source: "Código-fonte" }],
  [["pt-BR"], { source: "Código fonte" }],
  [["pl", "pl-PL"], { source: "Źródło" }],
  [["sk", "sk-SK"], { source: "Zdrojový kód" }],
  [["fr", "fr-FR"], { source: "Code source" }],
  [["es", "es-ES"], { source: "Código fuente" }],
  [["it", "it-IT"], { source: "Codice sorgente" }],
  [["ja", "ja-JP"], { source: "ソースコード" }],
  [["tr", "tr-TR"], { source: "Kaynak kodu" }],
  [["ko", "ko-KR"], { source: "소스 코드" }],
  [["fi", "fi-FI"], { source: "Lähdekoodi" }],
  [["hu", "hu-HU"], { source: "Forrás" }],
  [["id", "id-ID"], { source: "Sumber" }],
  [["nl", "nl-NL"], { source: "Bron" }],
];
