import { photoSwipePlugin } from "vuepress-plugin-photo-swipe";

import type { Plugin } from "@vuepress/core";
import type { PhotoSwipeOptions } from "vuepress-plugin-photo-swipe";

export const getPhotoSwipePlugin = (
  options?: PhotoSwipeOptions | false
): Plugin | null => {
  if (options === false) return null;

  return photoSwipePlugin({
    selector: ".theme-hope-content :not(a) > img",
    ...options,
  });
};
