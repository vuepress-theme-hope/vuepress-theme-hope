import { isPlainObject } from "@vuepress/helper";
import type { WatermarkPluginOptions } from "@vuepress/plugin-watermark";
import type { Plugin, PluginObject } from "vuepress/core";

import { logMissingPkg } from "./utils.js";

let watermarkPlugin:
  | ((options: WatermarkPluginOptions, legacy?: boolean) => Plugin)
  | null = null;

try {
  ({ watermarkPlugin } = await import("@vuepress/plugin-watermark"));
} catch {
  // Do nothing
}
/**
 * @private
 *
 * Resolve options for @vuepress/plugin-watermark
 */
export const getWatermarkPlugin = (
  options?: WatermarkPluginOptions | boolean,
): PluginObject | null => {
  if (!options) return null;

  if (!watermarkPlugin) {
    logMissingPkg("@vuepress/plugin-watermark");

    return null;
  }

  return watermarkPlugin(isPlainObject(options) ? options : {});
};
