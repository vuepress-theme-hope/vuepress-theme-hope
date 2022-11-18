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

export interface ReadingTimePluginPageData {
  readingTime: ReadingTime;
}
