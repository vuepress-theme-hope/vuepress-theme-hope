import PhotoSwipe = require("photoswipe");
import type PhotoSwipeDefaultUI from "photoswipe/dist/photoswipe-ui-default";

export interface PhowoSwipeI18n {
  /** 关闭 */
  close: string;
  /** 全屏 */
  fullsreen: string;
  /** 分享 */
  share: string;
  /** 缩放 */
  zoom: string;
  /** 上一个 */
  prev: string;
  /** 下一个 */
  next: string;
  /** 按钮 */
  buttons: PhotoSwipeDefaultUI.ShareButtonData[];
}

export interface PhotoSwipeOptions {
  /**
   * 选择的范围，只有 container 元素内部的图片才会支持点击缩放。
   *
   * The range for selection. Only the image inside the container element will support click zoom
   *
   * @default '.theme-default-content'
   */
  container?: string;
  /**
   * 图片选择器
   *
   * Image selector
   *
   * @default '.theme-default-content :not(a) > img'
   */
  selector?: string;
  /**
   * 传递给 photo-swipe 的额外选项
   *
   * Options which will pass to `photo-swipe`
   */
  options?: PhotoSwipe.Options;
}

declare global {
  const IMAGE_CONTAINER: string;
  const IMAGE_SELECTOR: string;
  const PHOTOSWIPE_OPTIONS: PhotoSwipe.Options;
  const PHOTOSWIPE_I18N: Record<string, PhowoSwipeI18n>;
}
