export interface SearchProHotKeyOptions {
  /**
   * Value of `event.key` to trigger the hot key
   *
   * 热键的 `event.key` 值
   */
  key: string;

  /**
   * Whether to press `event.altKey` at the same time
   *
   * 是否同时按下 `event.altKey`
   *
   * @default false
   */
  alt?: boolean;

  /**
   * Whether to press `event.ctrlKey` at the same time
   *
   * 是否同时按下 `event.ctrlKey`
   *
   * @default false
   */
  ctrl?: boolean;

  /**
   * Whether to press `event.shiftKey` at the same time
   *
   * 是否同时按下 `event.shiftKey`
   *
   * @default false
   */
  shift?: boolean;

  /**
   * Whether to press `event.metaKey` at the same time
   *
   * 是否同时按下 `event.metaKey`
   *
   * @default false
   */
  meta?: boolean;
}
