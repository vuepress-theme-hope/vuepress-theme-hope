import type artplayer from "artplayer/dist/artplayer.js";
import type { Option as ArtPlayerPluginDanmukuOption } from "artplayer-plugin-danmuku";

export type ArtPlayer = artplayer;
export type ArtPlayerOptions = typeof artplayer.option;

export interface CustomArtPlayerOptions
  extends Omit<ArtPlayerOptions, "container" | "url" | "customType"> {
  container?: HTMLElement | string;
  url?: string;
  quality?: {
    /**
     * Whether the default is selected
     */
    default?: boolean;

    /**
     * Html string of quality
     */
    html: string;

    /**
     * Video quality url
     */
    url: string;
    type?: string;
  }[];
  customType?: Record<string, unknown>;
}

export type UserArtPlayerSrcOptions = Omit<
  CustomArtPlayerOptions,
  "container" | "url" | "customType"
>;

export interface ComponentsArtPlayerOptions {
  /**
   * src config
   *
   * src 默认配置, 全局效果，会被组件内配置覆盖
   */
  src?: UserArtPlayerSrcOptions;

  /**
   * danmu config
   *
   * 弹幕插件默认配置, 全局效果，相同项会被组件内配置覆盖
   */
  pluginDanmuKu?: ArtPlayerPluginDanmukuOption;

  /**
   * default width
   *
   * 默认宽度
   */
  width?: string | number;

  /**
   * default height
   *
   * 默认高度
   */
  height?: string | number;

  /**
   * default ratio
   *
   * 默认比例
   */
  ratio?: string | number;
}
