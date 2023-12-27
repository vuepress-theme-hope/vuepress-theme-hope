import type { Plugin } from "@vuepress/core";
import { colors } from "@vuepress/utils";
import type { PWAOptions } from "vuepress-plugin-pwa2";
import { isPlainObject } from "vuepress-shared/node";

import { logger } from "../utils.js";

let pwaPlugin: (options: PWAOptions, legacy?: boolean) => Plugin;

try {
  ({ pwaPlugin } = await import("vuepress-plugin-pwa2"));
} catch (e) {
  // do nothing
}
/**
 * @private
 *
 * Resolve options for vuepress-plugin-pwa2
 */
export const getPWAPlugin = (
  options?: PWAOptions | boolean,
  favicon?: string,
  legacy = false,
): Plugin | null => {
  if (!options) return null;

  if (!pwaPlugin) {
    logger.error(`${colors.cyan("vuepress-plugin-pwa2")} is not installed!`);

    return null;
  }

  return pwaPlugin(
    {
      ...(favicon ? { favicon } : {}),
      ...(isPlainObject(options) ? options : {}),
    },
    legacy,
  );
};
