import { brLocale } from "./br.js";
import { deLocale } from "./de.js";
import { enLocale } from "./en.js";
import { esLocale } from "./es.js";
import { frLocale } from "./fr.js";
import { ruLocale } from "./ru.js";
import { skLocale } from "./sk.js";
import { ukLocale } from "./uk.js";
import { viLocale } from "./vi.js";
import { zhLocale } from "./zh.js";
import { zhTWLocale } from "./zhTW.js";

import type { HopeThemeLocaleData } from "../../shared/index.js";

export const themeLocalesData: Record<string, HopeThemeLocaleData> = {
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
};
