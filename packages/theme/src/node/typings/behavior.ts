export interface HopeThemeBehaviorOptions {
  /**
   * Whether to perform extra checks
   *
   * 是否执行额外检查
   *
   * @default true
   */
  check?: boolean;

  /**
   * Whether to compact with historical versions
   *
   * 是否兼容历史版本
   *
   * @default true
   */
  compact?: boolean;

  /**
   * Whether to enable customization
   *
   * 是否启用自定义
   *
   * @default false
   */
  custom?: boolean;

  /**
   * Whether to enable debug mode
   *
   * 是否启用调试模式
   *
   * @default false
   */
  debug?: boolean;

  /**
   * Whether to check VuePress version
   *
   * 是否检查 VuePress 版本
   *
   * @default true
   */
  checkVuePress?: boolean;
}
