export interface HopeThemeBehaviorOptions {
  /**
   * Whether perform extra checks
   *
   * 是否执行额外检查
   *
   * @default false
   */
  check?: boolean;

  /**
   * Whether compact with historical versions
   *
   * 是否兼容历史版本
   *
   * @default false
   */
  compact?: boolean;

  /**
   * Whether enable customization
   *
   * 是否启用自定义
   *
   * @default false
   */
  custom?: boolean;

  /**
   * Whether enable debug mode
   *
   * 是否启用调试模式
   *
   * @default false
   */
  debug?: boolean;
}
