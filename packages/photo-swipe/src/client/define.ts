import type { PhotoSwipeLocaleData } from "../shared/index.js";

declare const PHOTO_SWIPE_SELECTOR: string | string[];
declare const PHOTO_SWIPE_DELAY: number;
declare const PHOTO_SWIPE_LOCALES: Record<
  string,
  Record<`${keyof PhotoSwipeLocaleData}Title`, string>
>;
declare const PHOTO_SWIPE_SCROLL_TO_CLOSE: boolean;

export const imageSelector = PHOTO_SWIPE_SELECTOR;

export const locales = PHOTO_SWIPE_LOCALES;
export const delay = PHOTO_SWIPE_DELAY;

export const scrollToClose = PHOTO_SWIPE_SCROLL_TO_CLOSE;
