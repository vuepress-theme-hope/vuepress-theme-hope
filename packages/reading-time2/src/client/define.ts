import { type ReadingTimeLocaleConfig } from "vuepress-plugin-reading-time2";

declare const READING_TIME_LOCALES: ReadingTimeLocaleConfig | undefined;

export const readingTimeLocales =
  typeof READING_TIME_LOCALES === "undefined" ? null : READING_TIME_LOCALES;
