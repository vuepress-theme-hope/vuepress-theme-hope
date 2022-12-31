import { generateCatalog } from "./autoCatalog.js";

import type { Plugin } from "@vuepress/core";
import type { AutoCatalogOptions } from "./options.js";

export const autoCatalogPlugin = (options: AutoCatalogOptions): Plugin => ({
  name: "vuepress-plugin-auto-catalog",

  onInitialized: async (app): Promise<void> => generateCatalog(app, options),
});
