import type { PluginObject } from "@vuepress/core";

import type { RemovePWAOptions } from "./options.js";
import { generateEmptyServiceWorker } from "./serviceWorker.js";

export const removePWAPlugin = (
  options: RemovePWAOptions = {},
): PluginObject => ({
  name: "vuepress-plugin-remove-pwa",

  onGenerated: (app): Promise<void> => generateEmptyServiceWorker(app, options),
});
