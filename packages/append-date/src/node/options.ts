export interface AppendDateOptions {
  /**
   * Frontmatter key
   *
   * Frontmatter 键值
   *
   * @default 'date'
   */
  key?: string;

  /**
   * Date format
   *
   * 日期格式
   *
   * @default 'date'
   */
  format?: "date" | "time" | "full";
}
