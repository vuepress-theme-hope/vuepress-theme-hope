import type { PhotoSwipePluginOptions } from "@vuepress/plugin-photo-swipe";
import { photoSwipePlugin } from "@vuepress/plugin-photo-swipe";
import type { Plugin } from "vuepress/core";

/**
 * @private
 *
 * Resolve options for @vuepress/plugin-photo-swipe
 */
export const getPhotoSwipePlugin = (
  options?: PhotoSwipePluginOptions | boolean,
): Plugin | null => {
  if (options === false) return null;

  return photoSwipePlugin({
    selector: ".theme-hope-content :not(a) > img:not([no-view])",
    ...(options === true ? {} : options),
  });
};
