import type { ReadingTimeLocaleConfig } from "vuepress-plugin-reading-time2";
import type { PageInfoLocaleConfig } from "../shared";

declare const PAGE_INFO_LOCALES: PageInfoLocaleConfig;
declare const READING_TIME_LOCALES: ReadingTimeLocaleConfig;

export const pageInfoLocales = PAGE_INFO_LOCALES;

export const readingTimeLocales = READING_TIME_LOCALES;
