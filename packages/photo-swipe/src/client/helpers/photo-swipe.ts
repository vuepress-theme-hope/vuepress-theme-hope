import { type PhotoSwipeOptions as OriginalPhotoSwipeOptions } from "photoswipe";
import { type App, inject } from "vue";

export type PhotoSwipeOptions = Omit<
  OriginalPhotoSwipeOptions,
  // these are handled internally
  "dataSource" | "index"
>;

declare const __VUEPRESS_DEV__: boolean;

let photoSwipeOptions: PhotoSwipeOptions = {};

const photoswipeSymbol = Symbol(__VUEPRESS_DEV__ ? "photoswipe" : "");

export const definePhotoSwipeConfig = (options: PhotoSwipeOptions): void => {
  photoSwipeOptions = options;
};

export const usePhotoSwipeOptions = (): PhotoSwipeOptions =>
  inject(photoswipeSymbol)!;

export const injectPhotoSwipeConfig = (app: App): void => {
  app.provide(photoswipeSymbol, photoSwipeOptions);
};
