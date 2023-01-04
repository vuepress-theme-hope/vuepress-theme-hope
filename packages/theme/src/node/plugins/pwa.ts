import { isPlainObject } from "@vuepress/shared";
import { pwaPlugin } from "vuepress-plugin-pwa2";

import type { Plugin } from "@vuepress/core";
import type { PWAOptions } from "vuepress-plugin-pwa2";

export const getPWAPlugin = (
  options?: PWAOptions | boolean,
  legacy = false
): Plugin | null => {
  if (!options) return null;

  return pwaPlugin(isPlainObject(options) ? options : {}, legacy);
};
