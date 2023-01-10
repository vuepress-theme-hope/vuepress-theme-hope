import type artplayer from "artplayer/dist/artplayer.js";

export type ArtPlayer = artplayer;
export type ArtPlayerOptions = typeof artplayer.option;

type ArtPlayerCustomType = typeof artplayer.option.customType;

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
  customType?:
    | Record<string, ArtPlayerCustomType>
    | {
        [key: string]: ArtPlayerCustomType;
      }
    | any;
}

export interface ComponentsArtPlayerOptions {
  /**
   * src config
   *
   * src 默认配置, 全局效果，会被组件内配置覆盖
   */
  src?: CustomArtPlayerOptions;

  /**
   * danmu config
   *
   * 弹幕插件默认配置, 全局效果，会被组件内配置覆盖
   */
  pluginDanmuKu: object;

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
