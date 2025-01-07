import type { DefaultLocaleInfo } from "@vuepress/helper";

import type { SiteInfoLocaleData } from "../../shared/index.js";

export const siteInfoLocaleInfo: DefaultLocaleInfo<SiteInfoLocaleData> = [
  [["en", "en-US"], { source: "Source" }],
  [["zh", "zh-CN", "zh-Hans"], { source: "源代码" }],
  [["zh-tw", "zh-Hant"], { source: "源代碼" }],
  [["de"], { source: "Quellcode" }],
  [["vi"], { source: "Mã nguồn" }],
  [["uk"], { source: "Джерело" }],
  [["ru"], { source: "Исходный код" }],
  [["br"], { source: "Código fonte" }],
  [["pl"], { source: "Źródło" }],
  [["sk"], { source: "Zdrojový kód" }],
  [["fr"], { source: "Code source" }],
  [["es"], { source: "Código fuente" }],
  [["ja"], { source: "ソースコード" }],
  [["tr"], { source: "Kaynak kodu" }],
  [["ko"], { source: "소스 코드" }],
  [["fi"], { source: "Lähdekoodi" }],
  [["hu"], { source: "Forrás" }],
  [["id"], { source: "Sumber" }],
  [["nl"], { source: "Bron" }],
];
