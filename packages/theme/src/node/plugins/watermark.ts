import {
  watermarkPlugin,
  type WatermarkPluginOptions,
} from "@vuepress/plugin-watermark";
import type { Plugin } from "vuepress";
import { isPlainObject } from "vuepress/shared";

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
