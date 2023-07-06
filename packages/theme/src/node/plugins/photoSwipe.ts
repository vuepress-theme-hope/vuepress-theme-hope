import type { Plugin } from "@vuepress/core";
import type { PhotoSwipeOptions } from "vuepress-plugin-photo-swipe";
import { photoSwipePlugin } from "vuepress-plugin-photo-swipe";

/**
 * @private
 *
 * Resolve options for vuepress-plugin-photo-swipe
 */
export const getPhotoSwipePlugin = (
  options?: PhotoSwipeOptions | boolean,
): Plugin | null => {
  if (options === false) return null;

  return photoSwipePlugin({
    selector: ".theme-hope-content :not(a) > img:not([no-view])",
    ...(options === true ? {} : options),
  });
};
