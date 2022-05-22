import type { ConvertLocaleConfig } from "vuepress-shared";

export interface PhotoSwipeLocaleData {
  /**
   * Close button label text
   *
   * 关闭按钮标签文字
   */
  close: string;

  /**
   * Download button label text
   *
   * 下载按钮标签文字
   */
  download: string;

  /**
   * Full screen button label text
   *
   * 全屏按钮标签文字
   */
  fullscreen: string;

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
  arrowPrev: string;

  /**
   * Next image button label text
   *
   * 下一张图片按钮标签文字
   */
  arrowNext: string;
}

export type PhotoSwipeLocaleConfig = ConvertLocaleConfig<PhotoSwipeLocaleData>;
