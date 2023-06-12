import type { PhotoSwipeOptions as OriginalPhotoSwipeOptions } from "photoswipe";
import type { App } from "vue";
import { inject } from "vue";

export type PhotoSwipeOptions = Omit<
  OriginalPhotoSwipeOptions,
  // these are handled internally
  "dataSource" | "index"
>;

declare const __VUEPRESS_DEV__: boolean;

let photoswipeOptions: PhotoSwipeOptions = {};

const photoswipeSymbol = Symbol(__VUEPRESS_DEV__ ? "photoswipe" : "");

export const definePhotoSwipeConfig = (options: PhotoSwipeOptions): void => {
  photoswipeOptions = options;
};

export const usePhotoSwipeOptions = (): PhotoSwipeOptions =>
  inject(photoswipeSymbol)!;

export const injectPhotoSwipeConfig = (app: App): void => {
  app.provide(photoswipeSymbol, photoswipeOptions);
};
