import { type Plugin } from "@vuepress/core";
import { isPlainObject } from "@vuepress/shared";
import { type PWAOptions, pwaPlugin } from "vuepress-plugin-pwa2";

/**
 * @private
 *
 * Resolve options for vuepress-plugin-pwa2
 */
export const getPWAPlugin = (
  options?: PWAOptions | boolean,
  favicon?: string,
  legacy = true
): Plugin | null => {
  if (!options) return null;

  return pwaPlugin(
    {
      ...(favicon ? { favicon } : {}),
      ...(isPlainObject(options) ? options : {}),
    },
    legacy
  );
};
