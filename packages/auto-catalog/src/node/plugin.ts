import { type PluginFunction } from "@vuepress/core";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import { checkVersion, getLocales } from "vuepress-shared/node";

import { generateCatalog, injectCatalogInformation } from "./autoCatalog.js";
import { locales as defaultLocales } from "./locales.js";
import { type AutoCatalogOptions } from "./options.js";
import { CLIENT_FOLDER, PLUGIN_NAME, logger } from "./utils.js";

export const autoCatalogPlugin =
  (options: AutoCatalogOptions = {}): PluginFunction =>
  (app) => {
    checkVersion(app, PLUGIN_NAME, "2.0.0-beta.61");

    if (app.env.isDebug) logger.info("Options:", options);

    useSassPalettePlugin(app, { id: "hope" });

    const {
      component,
      iconComponent,
      iconRouteMetaKey = "icon",
      indexRouteMetaKey = "index",
      locales,
      orderRouteMetaKey = "order",
      titleRouteMetaKey = "title",
    } = options;

    return {
      name: PLUGIN_NAME,

      define: (): Record<string, unknown> => ({
        AUTO_CATALOG_LOCALES: getLocales({
          app,
          name: PLUGIN_NAME,
          default: defaultLocales,
          config: locales,
        }),
        AUTO_CATALOG_ICON_COMPONENT: iconComponent || "",
        AUTO_CATALOG_TITLE_META_KEY: titleRouteMetaKey,
        AUTO_CATALOG_ICON_META_KEY: iconRouteMetaKey,
        AUTO_CATALOG_ORDER_META_KEY: orderRouteMetaKey,
        AUTO_CATALOG_INDEX_META_KEY: indexRouteMetaKey,
      }),

      onInitialized: async (app): Promise<void> => {
        injectCatalogInformation(app, options);
        await generateCatalog(app, options);
      },

      ...(component ? {} : { clientConfigFile: `${CLIENT_FOLDER}config.js` }),
    };
  };
