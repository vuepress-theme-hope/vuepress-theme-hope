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

export interface ReadingTime {
  /**
   * expect reading time
   *
   * 期望的阅读时间
   */
  minutes: number;
  /**
   * words of current page
   *
   * 当前页的字数
   */
  words: number;
}

export interface ReadingTimeOptions {
  /**
   * 每分钟阅读的字数
   *
   * reading speed (words per minute)
   *
   * @default 300
   */
  wordPerminute?: number;
}
