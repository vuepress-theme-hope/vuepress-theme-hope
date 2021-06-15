import type { LightGallerySettings } from "lightgallery/lg-settings";

export type LightGalleryPlugin =
  | "autoplay"
  | "fullscreen"
  | "pager"
  | "thumbnail"
  | "rotate"
  | "share"
  | "zoom";

export interface LightGalleryOptions {
  /**
   * 图片选择器
   *
   * Image selector
   *
   * @default '.theme-default-content :not(a) > img'
   */
  selector?: string;

  /**
   * lightgallery 抓取页面图片的延时，单位 ms
   *
   * 如果你使用的主题有切换动画，建议配置此选项为 `切换动画时长 + 200`
   *
   * The delay of lightgallery fetching page images, in ms
   *
   * If the theme you are using has a switching animation, it is recommended to configure this option to `Switch animation duration + 200`
   *
   * @default 500
   */
  delay?: number;

  /**
   * 传递给 lightgallery 的额外选项
   *
   * Options which will pass to `lightgallery`
   */
  options?: LightGallerySettings;

  /**
   * 想要启用的 Light Gallery 插件。
   *
   * Light Gallery Plugins to enable
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
}
