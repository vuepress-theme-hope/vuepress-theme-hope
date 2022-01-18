import * as PhotoSwipe from "photoswipe";
import type { PhowoSwipeLocaleConfig } from "../shared";

declare const IMAGE_SELECTOR: string;
declare const PHOTOSWIPE_DELAY: number;
declare const PHOTOSWIPE_OPTIONS: PhotoSwipe.Options;
declare const PHOTOSWIPE_LOCALES: PhowoSwipeLocaleConfig;

export const imageSelector = IMAGE_SELECTOR;

export const locales = PHOTOSWIPE_LOCALES;

export const delay = PHOTOSWIPE_DELAY;

export const options = PHOTOSWIPE_OPTIONS;
