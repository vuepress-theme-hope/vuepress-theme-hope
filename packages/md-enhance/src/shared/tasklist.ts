export interface TaskListOptions {
  /**
   * 是否使用 `<label>` 来包裹文字
   *
   * Whether use `<label>` to wrap text
   *
   * @default true
   */
  label?: boolean;

  /**
   * 是否将 `<label>` 放置在 `<input>` 后还是包裹住 `<input>`
   *
   * Whether place `<label>` after `<input>` or wrap `<input>`
   *
   * @default true
   */
  labelAfter?: boolean;
}
