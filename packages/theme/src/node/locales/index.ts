import { brLocale } from "./br";
import { deLocale } from "./de";
import { enLocale } from "./en";
import { esLocale } from "./es";
import { frLocale } from "./fr";
import { ruLocale } from "./ru";
import { skLocale } from "./sk";
import { ukLocale } from "./uk";
import { viLocale } from "./vi";
import { zhLocale } from "./zh";
import { zhTWLocale } from "./zhTW";

import type { HopeThemeLocaleData } from "../../shared";

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
