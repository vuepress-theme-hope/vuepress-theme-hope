import type { ResolvedLocaleConfig } from "@mr-hope/vuepress-shared";

export interface ReadingTimeI18nConfig {
  /**
   * 字数模板
   *
   * Word template
   */
  word: string;
  /**
   * 小于一分钟文字
   *
   * Text for less than one minute
   */
  minute: string;
  /**
   * 时间模板
   *
   * Time template
   */
  time: string;
}

export type ReadingTimeLocaleConfig =
  ResolvedLocaleConfig<ReadingTimeI18nConfig>;
