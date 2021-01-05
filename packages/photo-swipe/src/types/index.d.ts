import PhotoSwipe = require("photoswipe");

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
}
