/** 阅读时间 */
export interface ReadingTime {
  /** 分钟数 */
  minutes: number;
  /** 字数 */
  words: number;
}

export interface ReadingTimeOptions {
  /** 每分钟阅读数 */
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
