import type { CovertLocaleConfig } from "@mr-hope/vuepress-shared";

/**
 * Muti language config for `vuepress-plugin-reading-time2` plugin
 *
 * `vuepress-plugin-reading-time2` 插件的多语言配置
 */
export interface ReadingTimeLocaleData {
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

export type ReadingTimeLocaleConfig = CovertLocaleConfig<ReadingTimeLocaleData>;
