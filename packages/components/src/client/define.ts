import type { ReadingTimeLocaleConfig } from "vuepress-plugin-reading-time2";
import type { ArticleInfoLocaleConfig } from "../shared";

declare const ARTICLE_INFO_LOCALES: ArticleInfoLocaleConfig;
declare const READING_TIME_LOCALES: ReadingTimeLocaleConfig;

export const articleInfoLocales = ARTICLE_INFO_LOCALES;

export const readingTimeLocales = READING_TIME_LOCALES;
