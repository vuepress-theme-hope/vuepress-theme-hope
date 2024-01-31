import { isPlainObject } from "@vuepress/helper/node";
import type { CopyCodePluginOptions } from "@vuepress/plugin-copy-code";
import { copyCodePlugin } from "@vuepress/plugin-copy-code";
import type { Plugin } from "vuepress/core";

/**
 * @private
 *
 * Resolve options for @vuepress/plugin-copy-code
 */
export const getCopyCodePlugin = (
  options?: CopyCodePluginOptions | boolean,
): Plugin | null => {
  if (options === false) return null;

  return copyCodePlugin({
    selector: '.theme-hope-content div[class*="language-"] pre',
    ...(isPlainObject(options) ? options : {}),
  });
};
