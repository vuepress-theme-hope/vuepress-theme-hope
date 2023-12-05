import type { LightGallerySettings } from "lightgallery/lg-settings.js";
import type { App } from "vue";
import { inject } from "vue";

export type LightGalleryOptions = LightGallerySettings;

declare const __VUEPRESS_DEV__: boolean;

let lightGalleryOptions: LightGalleryOptions = {};

const lightGallerySymbol = Symbol(__VUEPRESS_DEV__ ? "lightgallery" : "");

export const defineLightGalleryConfig = (
  options: LightGalleryOptions,
): void => {
  lightGalleryOptions = options;
};

export const useLightGalleryOptions = (): LightGalleryOptions =>
  inject(lightGallerySymbol)!;

export const injectLightGalleryConfig = (app: App): void => {
  app.provide(lightGallerySymbol, lightGalleryOptions);
};
