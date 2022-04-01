import type { PhotoSwipeInitOptions } from "photoswipe";

declare const PHOTO_SWIPE_SELECTOR: string;
declare const PHOTO_SWIPE_DELAY: number;
declare const PHOTO_SWIPE_OPTIONS: PhotoSwipeInitOptions;
declare const PHOTO_SWIPE_LOCALES: Record<
  string,
  {
    /**
     * arrowPrev button title
     */
    arrowPrevTitle: string;

    /**
     * arrowNext button title
     */
    arrowNextTitle: string;

    /**
     * close button title
     */
    closeTitle: string;

    /**
     * download button title
     */
    downloadTitle: string;

    /**
     * fullscreen button title
     */
    fullscreenTitle: string;

    /**
     * zoom button title
     */
    zoomTitle: string;
  }
>;

export const imageSelector = PHOTO_SWIPE_SELECTOR;

export const locales = PHOTO_SWIPE_LOCALES;
export const delay = PHOTO_SWIPE_DELAY;

export const options = PHOTO_SWIPE_OPTIONS;
