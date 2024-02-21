import { isPlainObject } from "@vuepress/helper";
import type { PwaPluginOptions } from "@vuepress/plugin-pwa";
import type { Plugin } from "vuepress/core";
import { colors } from "vuepress/utils";

import { logger } from "../utils.js";

let pwaPlugin: (options: PwaPluginOptions, legacy?: boolean) => Plugin;

try {
  ({ pwaPlugin } = await import("@vuepress/plugin-pwa"));
} catch (e) {
  // Do nothing
}
/**
 * @private
 *
 * Resolve options for @vuepress/plugin-pwa
 */
export const getPwaPlugin = (
  options?: PwaPluginOptions | boolean,
  favicon?: string,
): Plugin | null => {
  if (!options) return null;

  if (!pwaPlugin) {
    logger.error(`${colors.cyan("@vuepress/plugin-pwa")} is not installed!`);

    return null;
  }

  return pwaPlugin({
    ...(favicon ? { favicon } : {}),
    ...(isPlainObject(options) ? options : {}),
  });
};
