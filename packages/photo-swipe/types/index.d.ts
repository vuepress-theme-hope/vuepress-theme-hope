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
  const IMAGE_CONTAINER: string;
  const IMAGE_SELECTOR: string;
  const PHOTOSWIPE_OPTIONS: PhotoSwipe.Options;
}
