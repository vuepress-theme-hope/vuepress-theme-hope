import type { LightGallerySettings } from "lightgallery/lg-settings.js";

export type LightGalleryOptions = LightGallerySettings;

let lightGalleryOptions: LightGalleryOptions = {};

export const defineLightGalleryConfig = (
  options: LightGalleryOptions,
): void => {
  lightGalleryOptions = options;
};

export const useLightGalleryOptions = (): LightGalleryOptions =>
  lightGalleryOptions;
