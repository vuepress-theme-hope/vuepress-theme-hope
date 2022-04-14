import { brLocale } from "./br";
import { deLocale } from "./de";
import { enLocale } from "./en";
import { ruLocale } from "./ru";
import { ukLocale } from "./uk";
import { viLocale } from "./vi";
import { zhLocale } from "./zh";
import { zhTWLocale } from "./zhTW";

import type { HopeThemeLocaleData } from "../../shared";

export const themeLocalesData: Record<string, HopeThemeLocaleData> = {
  "/en/": enLocale,

  "/zh/": zhLocale,

  "/zh-tw/": zhTWLocale,

  "/de/": deLocale,

  "/vi/": viLocale,

  "/ru/": ruLocale,

  "/uk/": ukLocale,

  "/br/": brLocale,
};
