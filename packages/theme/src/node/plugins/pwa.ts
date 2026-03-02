import { isPlainObject } from "@vuepress/helper";
import type { PwaPluginOptions } from "@vuepress/plugin-pwa";
import type { Plugin } from "vuepress/core";

import { logMissingPkg } from "./utils.js";

let pwaPlugin: ((options: PwaPluginOptions, legacy?: boolean) => Plugin) | null = null;

try {
  ({ pwaPlugin } = await import("@vuepress/plugin-pwa"));
} catch {
  // Do nothing
}

/**
 * Resolve options for `@vuepress/plugin-pwa`
 *
 * @param options PWA plugin options or a boolean to enable it with default options
 * @param favicon Favicon for PWA plugin
 * @returns PWA plugin instance or null
 */
export const getPwaPlugin = (
  options?: PwaPluginOptions | boolean,
  favicon?: string,
): Plugin | null => {
  if (!options) return null;

  if (!pwaPlugin) {
    logMissingPkg("@vuepress/plugin-pwa");

    return null;
  }

  return pwaPlugin({
    favicon,
    ...(isPlainObject(options) ? options : {}),
  });
};
