import type {
  CommentOptions,
  PageInfoLocaleConfig,
  WalineOptions,
  WalineLocaleConfig,
} from "../shared";
import type { ReadingTimeI18nConfig } from "vuepress-plugin-reading-time2";

declare const READING_TIME_I18N: Record<string, ReadingTimeI18nConfig>;

declare const COMMENT_OPTIONS: CommentOptions;
declare const PAGE_INFO_I18N: PageInfoLocaleConfig;
declare const WALINE_I18N: WalineLocaleConfig;

export const commentOptions = COMMENT_OPTIONS;
export const pageInfoI18n = PAGE_INFO_I18N;

export const readingTimeI18n = READING_TIME_I18N;

export const walineOption = commentOptions as WalineOptions;

export const enableWaline = Boolean(
  walineOption && walineOption.type === "waline" && walineOption.serverURL
);

export const walineI18n = WALINE_I18N;
