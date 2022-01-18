import type {
  CommentOptions,
  PageInfoLocaleConfig,
  WalineOptions,
  WalineLocaleConfig,
} from "../shared";
import type { ReadingTimeLocaleConfig } from "vuepress-plugin-reading-time2";

declare const READING_TIME_LOCALES: ReadingTimeLocaleConfig;

declare const COMMENT_OPTIONS: CommentOptions;
declare const PAGE_INFO_LOCALES: PageInfoLocaleConfig;
declare const WALINE_LOCALES: WalineLocaleConfig;

export const commentOptions = COMMENT_OPTIONS;
export const pageInfoLocales = PAGE_INFO_LOCALES;

export const readingTimeLocales = READING_TIME_LOCALES;

export const walineOption = commentOptions as WalineOptions;

export const enableWaline = Boolean(
  walineOption && walineOption.type === "waline" && walineOption.serverURL
);

export const walineLocales = WALINE_LOCALES;
