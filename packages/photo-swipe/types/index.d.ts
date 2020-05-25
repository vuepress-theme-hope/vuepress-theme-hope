import PhotoSwipe = require("photoswipe");

export interface PhotoSwipeOptions {
  /** Root Container for Images */
  container?: string;
  /** selector for images */
  selector?: string;
  /** Options which will pass to `photo-swipe` */
  option?: PhotoSwipe.Options;
}

declare global {
  /** 图片容器 */
  const IMAGE_CONTAINER: string;
  /** 图片选择器 */
  const IMAGE_SELECTOR: string;
  /** photo-swipe 选项 */
  const PHOTOSWIPE_OPTIONS: PhotoSwipe.Options;
}
