import { isPlainObject } from "@vuepress/helper";
import type { BackToTopPluginOptions } from "@vuepress/plugin-back-to-top";
import { backToTopPlugin } from "@vuepress/plugin-back-to-top";
import type { Plugin } from "vuepress/core";

/**
 * @private
 *
 * Resolve options for @vuepress/plugin-back-to-top
 */
export const getBackToTop = (
  backToTop?: BackToTopPluginOptions | boolean,
): Plugin | null => {
  if (backToTop === false) return null;

  return backToTopPlugin(isPlainObject(backToTop) ? backToTop : {});
};
