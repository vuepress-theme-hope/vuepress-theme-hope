import type { LocaleConfig } from "@vuepress/core";
import type { ReadingTimeI18nConfig } from "./locales";

export interface ReadingTimeOptions {
  /**
   * 每分钟阅读的字数
   *
   * reading speed (words per minute)
   *
   * @default 300
   */
  wordPerminute?: number;

  locales?: LocaleConfig<ReadingTimeI18nConfig>;
}
