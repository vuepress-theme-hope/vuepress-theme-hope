import type { Plugin } from "@vuepress/core";
import type { PWAOptions } from "vuepress-plugin-pwa2";
import { pwaPlugin } from "vuepress-plugin-pwa2";
import { isPlainObject } from "vuepress-shared/node";

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

  return pwaPlugin(
    {
      ...(favicon ? { favicon } : {}),
      ...(isPlainObject(options) ? options : {}),
    },
    legacy,
  );
};
