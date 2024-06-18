import { isPlainObject } from "@vuepress/helper";
import type { WatermarkPluginOptions } from "@vuepress/plugin-watermark";
import { watermarkPlugin } from "@vuepress/plugin-watermark";
import type { Plugin } from "vuepress";

/**
 * @private
 *
 * resolve options for @vuepress/plugin-watermark
 */
export const getWatermarkPlugin = (
  options?: WatermarkPluginOptions | boolean,
): Plugin | null => {
  if (options) {
    return watermarkPlugin(isPlainObject(options) ? options : {});
  }

  return null;
};
