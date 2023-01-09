import { brLocale } from "./br.js";
import { deLocale } from "./de.js";
import { enLocale } from "./en.js";
import { esLocale } from "./es.js";
import { fiLocale } from "./fi.js";
import { frLocale } from "./fr.js";
import { jaLocale } from "./ja.js";
import { koLocale } from "./ko.js";
import { ruLocale } from "./ru.js";
import { skLocale } from "./sk.js";
import { trLocale } from "./tr.js";
import { ukLocale } from "./uk.js";
import { viLocale } from "./vi.js";
import { zhLocale } from "./zh.js";
import { zhTWLocale } from "./zhTW.js";

import type { ThemeLocaleData } from "../../shared/index.js";

export const themeLocalesData: Record<string, ThemeLocaleData> = {
  "/en/": enLocale,

  "/zh/": zhLocale,

  "/zh-tw/": zhTWLocale,

  "/de-at/": deLocale,

  "/vi/": viLocale,

  "/ru/": ruLocale,

  "/uk/": ukLocale,

  "/br/": brLocale,

  "/sk/": skLocale,

  "/fr/": frLocale,

  "/es/": esLocale,

  "/ja/": jaLocale,

  "/tr/": trLocale,

  "/ko/": koLocale,

  "/fi/": fiLocale,
};
