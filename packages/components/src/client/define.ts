import type { ReadingTimeLocaleConfig } from "vuepress-plugin-reading-time2";
import type { ComponentLocaleConfig, PageInfoLocaleConfig } from "../shared";

declare const COMPONENT_LOCALES: ComponentLocaleConfig;
declare const PAGE_INFO_LOCALES: PageInfoLocaleConfig;
declare const READING_TIME_LOCALES: ReadingTimeLocaleConfig;

export const componentLocales = COMPONENT_LOCALES;
export const pageInfoLocales = PAGE_INFO_LOCALES;

export const readingTimeLocales = READING_TIME_LOCALES;
