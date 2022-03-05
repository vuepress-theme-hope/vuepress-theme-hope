import { pwa } from "vuepress-plugin-pwa2";

import type { PluginConfig } from "@vuepress/core";
import type { PWAOptions } from "vuepress-plugin-pwa2";

export const resolvePWAPlugin = (
  options?: PWAOptions | boolean
): PluginConfig => pwa(options === true ? {} : options || false);
