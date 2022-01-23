export interface HopeThemeAppearanceOptions {
  /**
   * Whether enable pure mode
   *
   * 是否开启纯净模式
   *
   * @default false
   */
  pure?: boolean;

  /**
   * Font class 图标前缀
   *
   * Font class Icon prefix
   *
   * @default 'icon-'
   */
  iconPrefix?: string;

  /**
   * Wether display backto top button
   *
   * If it’s set with a number, then it will be the threshold
   *
   * 是否显示返回顶部按钮
   *
   * 如果设置为数字，则该数字为触发临界值 (默认临界值为 300px)
   *
   * @default true
   */
  backToTop?: boolean | number;
}
