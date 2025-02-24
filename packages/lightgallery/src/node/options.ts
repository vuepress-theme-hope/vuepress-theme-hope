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
export interface LightGalleryPluginOptions {
  /**
   * Image selector
   *
   * 图片选择器
   *
   * @default "[vp-content] :not(a) > img:not([no-view])"
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
}
