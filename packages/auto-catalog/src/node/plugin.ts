import type { PluginFunction } from "@vuepress/core";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import {
  addViteSsrNoExternal,
  checkVersion,
  getLocales,
} from "vuepress-shared/node";

import { generateCatalog } from "./autoCatalog.js";
import { convertOptions } from "./compact.js";
import { locales as defaultLocales } from "./locales.js";
import type { AutoCatalogOptions } from "./options.js";
import { CLIENT_FOLDER, PLUGIN_NAME, logger } from "./utils.js";

export const autoCatalogPlugin =
  (options: AutoCatalogOptions = {}, legacy = true): PluginFunction =>
  (app) => {
    if (legacy)
      convertOptions(options as AutoCatalogOptions & Record<string, unknown>);

    checkVersion(app, PLUGIN_NAME, "2.0.0-rc.0");

    if (app.env.isDebug) logger.info("Options:", options);

    useSassPalettePlugin(app, { id: "hope" });

    const { component, locales } = options;

    return {
      name: PLUGIN_NAME,

      define: (): Record<string, unknown> => ({
        AUTO_CATALOG_LOCALES: getLocales({
          app,
          name: PLUGIN_NAME,
          default: defaultLocales,
          config: locales,
        }),
      }),

      onInitialized: (app): Promise<void> => generateCatalog(app, options),

      extendsBundlerOptions: (bundlerOptions: unknown, app): void => {
        addViteSsrNoExternal(bundlerOptions, app, "vuepress-shared");
      },

      ...(component ? {} : { clientConfigFile: `${CLIENT_FOLDER}config.js` }),
    };
  };
