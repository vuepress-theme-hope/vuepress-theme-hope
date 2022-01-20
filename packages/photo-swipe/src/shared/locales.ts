import type { ConvertLocaleConfig } from "@mr-hope/vuepress-shared";
import type PhotoSwipeDefaultUI from "photoswipe/dist/photoswipe-ui-default";

export interface PhowoSwipeLocaleData {
  /**
   * Close button label text
   *
   * 关闭按钮标签文字
   */
  close: string;

  /**
   * Full screen button label text
   *
   * 全屏按钮标签文字
   */
  fullscreen: string;

  /**
   * Share button label text
   *
   * 分享按钮标签文字
   */
  share: string;

  /**
   * Zoom button label text
   *
   * 缩放按钮标签文字
   */
  zoom: string;

  /**
   * Previous image button label text
   *
   * 上一张图片按钮标签文字
   */
  prev: string;

  /**
   * Next image button label text
   *
   * 下一张图片按钮标签文字
   */
  next: string;

  /**
   * Share button config
   *
   * 功能按钮配置
   */
  buttons: PhotoSwipeDefaultUI.ShareButtonData[];
}

export type PhowoSwipeLocaleConfig = ConvertLocaleConfig<PhowoSwipeLocaleData>;
