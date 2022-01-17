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

  /**
   * 多语言选项
   *
   * @see [默认配置](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/reading-time2/src/node/i18n.ts)
   *
   * I18n config
   *
   * @see [default config](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/reading-time2/src/node/i18n.ts)
   */

  locales?: LocaleConfig<ReadingTimeI18nConfig>;
}
