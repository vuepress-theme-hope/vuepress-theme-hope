import PhotoSwipe = require("photoswipe");

export interface PhotoSwipeOptions {
  selector?: string;
  option?: PhotoSwipe.Options;
}

declare global {
  /** 图片选择器 */
  const IMAGE_SELECTOR: string;
  /** photo-swipe 选项 */
  const PHOTOSWIPE_OPTIONS: PhotoSwipe.Options;
}
