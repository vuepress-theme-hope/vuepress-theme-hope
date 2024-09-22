import { isPlainObject } from "@vuepress/helper";
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

  return copyCodePlugin(isPlainObject(options) ? options : {});
};
