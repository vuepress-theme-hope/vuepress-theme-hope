export interface ReadingTime {
  /** expect reading time */
  minutes: number;
  /** words of this page */
  words: number;
}

export interface ReadingTimeOptions {
  /** reading speed (words per minute) */
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
