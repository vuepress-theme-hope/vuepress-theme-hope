/**
 * LightGallery plugins
 */
export type LightGalleryPlugin =
  | "autoplay"
  | "fullscreen"
  | "pager"
  | "thumbnail"
  | "rotate"
  | "share"
  | "zoom";

/**
 * Options of plugin
 */
export interface LightGalleryOptions {
  /**
   * Image selector
   *
   * 图片选择器
   *
   * @default ".theme-default-content :not(a) > img:not([no-view])"
   */
  selector?: string;

  /**
   * Light Gallery Plugins to enable
   *
   * 想要启用的 Light Gallery 插件。
   *
   * 可选值 / Optional Values:
   *
   * - "autoplay"
   * - "fullscreen"
   * - "pager"
   * - "thumbnail"
   * - "rotate"
   * - "share"
   * - "zoom"
   *
   * @default ["pager", "share", "zoom"]
   */

  plugins?: LightGalleryPlugin[];

  /**
   * The delay of lightgallery fetching page images, in ms.
   *
   * If the theme you are using has a switching animation, it is recommended to configure this option to `Switch animation duration + 200`.
   *
   * lightgallery 抓取页面图片的延时，单位 ms。
   *
   * 如果你使用的主题有切换动画，建议配置此选项为 `切换动画时长 + 200`。
   *
   * @default 800
   */
  delay?: number;
}
