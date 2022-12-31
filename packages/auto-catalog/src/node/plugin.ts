import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import { generateCatalog } from "./autoCatalog.js";
import { CLIENT_FOLDER } from "./utils.js";

import type { PluginFunction } from "@vuepress/core";
import type { AutoCatalogOptions } from "./options.js";

export const autoCatalogPlugin =
  (options: AutoCatalogOptions = {}): PluginFunction =>
  (app) => {
    useSassPalettePlugin(app, { id: "hope" });

    return {
      name: "vuepress-plugin-auto-catalog",

      define: (): Record<string, unknown> => ({
        SHOULD_REGISTER_AUTO_CATALOG_COMPONENT:
          options.component === "AutoCatalog" || !options.component,
      }),

      onInitialized: async (app): Promise<void> =>
        generateCatalog(app, options),

      clientConfigFile: `${CLIENT_FOLDER}config.js`,
    };
  };
