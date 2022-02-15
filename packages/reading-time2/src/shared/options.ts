import type { LocaleConfig } from "@vuepress/core";
import type { ReadingTimeLocaleData } from "./locales";

export interface ReadingTimeOptions {
  /**
   * reading speed (words per minute)
   *
   * 每分钟阅读的字数
   *
   * @default 300
   */
  wordPerMinute?: number;

  /**
   * Locales config
   *
   * @see [default config](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/reading-time2/src/node/locales.ts)
   *
   * 多语言选项
   *
   * @see [默认配置](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/reading-time2/src/node/locales.ts)
   */

  locales?: LocaleConfig<ReadingTimeLocaleData>;
}
