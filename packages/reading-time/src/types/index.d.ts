import type { Langs } from "@mr-hope/vuepress-shared";

export interface ReadingTimeI18nConfig {
  /** 字数模板 */
  word: string;
  /** 小于一分钟文字 */
  minute: string;
  /** 时间模板 */
  time: string;
}

export interface ReadingTime {
  /** expect reading time */
  minutes: number;
  /** words of this page */
  words: number;
}

export interface ReadingTimeOptions {
  /**
   * 主目录所对应的语言。
   *
   * The language of the home directory.
   *
   * @default 'en-US'
   */
  baseLang?: Langs;

  /**
   * 每分钟阅读的字数
   *
   * reading speed (words per minute)
   *
   * @default 300
   */
  wordPerminute?: number;
}

declare module "@mr-hope/vuepress-types/types/page" {
  interface PageComputed {
    readingTime: ReadingTime;
  }

  interface Page {
    readingTime: ReadingTime;
  }
}

declare global {
  const READING_TIME_I18N: Record<string, ReadingTimeI18nConfig>;
}
