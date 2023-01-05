import { generateEmptyServiceWorker } from "./serviceWorker.js";

import type { PluginObject } from "@vuepress/core";
import type { RemovePWAOptions } from "./options.js";

export const removePWAPlugin = (
  options: RemovePWAOptions = {}
): PluginObject => ({
  name: "vuepress-plugin-remove-pwa",

  onGenerated: (app): Promise<void> => generateEmptyServiceWorker(app, options),
});
