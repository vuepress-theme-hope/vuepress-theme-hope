import * as PhotoSwipe from "photoswipe";
import type { PhowoSwipeLocaleConfig } from "../shared";

declare const PHOTO_SWIPE_SELECTOR: string;
declare const PHOTO_SWIPE_DELAY: number;
declare const PHOTO_SWIPE_OPTIONS: PhotoSwipe.Options;
declare const PHOTO_SWIPE_LOCALES: PhowoSwipeLocaleConfig;

export const imageSelector = PHOTO_SWIPE_SELECTOR;

export const locales = PHOTO_SWIPE_LOCALES;

export const delay = PHOTO_SWIPE_DELAY;

export const options = PHOTO_SWIPE_OPTIONS;
