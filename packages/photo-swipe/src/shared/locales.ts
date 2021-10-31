import type { ResolvedLocaleConfig } from "@mr-hope/vuepress-shared";
import type PhotoSwipeDefaultUI from "photoswipe/dist/photoswipe-ui-default";

export interface PhowoSwipeI18nConfig {
  /**
   * 关闭按钮标签文字
   *
   * Close button label text
   */
  close: string;

  /**
   * 全屏按钮标签文字
   *
   * Full screen button label text
   */
  fullscreen: string;

  /**
   * 分享按钮标签文字
   *
   * Share button label text
   */
  share: string;

  /**
   * 缩放按钮标签文字
   *
   * Zoom button label text
   */
  zoom: string;

  /**
   * 上一张图片按钮标签文字
   *
   * Previous image button label text
   */
  prev: string;

  /**
   * 下一张图片按钮标签文字
   *
   * Next image button label text
   */
  next: string;

  /**
   * 功能按钮配置
   *
   * Share button config
   */
  buttons: PhotoSwipeDefaultUI.ShareButtonData[];
}

export type PhowoSwipeLocaleConfig = ResolvedLocaleConfig<PhowoSwipeI18nConfig>;
