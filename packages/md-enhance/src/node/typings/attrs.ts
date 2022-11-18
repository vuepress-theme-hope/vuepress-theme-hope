export interface AttrsOptions {
  /**
   * left delimiter
   *
   * 左分隔符
   *
   * @default '{'
   */
  left?: string;

  /**
   * right delimiter
   *
   * 右分隔符
   *
   * @default '}'
   */
  right?: string;

  /**
   * allowed attributes
   *
   * @description An empty list means allowing all attribute
   *
   * 允许的属性
   *
   * @description 设置空数组意味着允许所有属性
   *
   * @default []
   */
  allowed?: (string | RegExp)[];
}
