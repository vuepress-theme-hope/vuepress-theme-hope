export interface BackToTopOptions {
  /**
   * Scroll threshold distance to display back to top button (in pixels)
   *
   * 滚动距离阈值，用于显示返回顶部按钮 (单位: 像素)
   *
   * @default 100
   */
  threshold?: number;

  /**
   * Whether display scroll progress
   *
   * 是否显示滚动进度
   *
   * @default true
   */
  progress?: boolean;
}
