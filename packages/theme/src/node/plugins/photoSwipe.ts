import { photoSwipe } from "vuepress-plugin-photo-swipe";

import type { PluginConfig } from "@vuepress/core";
import type { PhotoSwipeOptions } from "vuepress-plugin-photo-swipe";

export const resolvePhotoSwipePlugin = (
  options?: PhotoSwipeOptions | false
): PluginConfig => {
  if (options === false) return ["", false];

  return photoSwipe({
    selector: ".theme-hope-content :not(a) > img",
    ...options,
  });
};
