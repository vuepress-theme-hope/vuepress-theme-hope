import { type PluginFunction } from "@vuepress/core";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import { checkVersion, getLocales } from "vuepress-shared/node";

import { generateCatalog } from "./autoCatalog.js";
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
      iconGetter,
      iconRouteMetaKey = "i",
      shouldIndex,
      indexRouteMetaKey = "I",
      locales,
      orderGetter,
      orderRouteMetaKey = "O",
      titleGetter = (page): string => page.title,
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

      extendsPage: (page): void => {
        if (!component) {
          const data: Record<string, unknown> = {};

          const pageTitle = titleGetter?.(page);
          const pageIcon = iconGetter?.(page);
          const pageIndex = shouldIndex?.(page) ?? null;
          const pageOrder = orderGetter?.(page) ?? null;

          if (pageTitle) data[titleRouteMetaKey] = pageTitle;
          if (pageIcon) data[iconRouteMetaKey] = pageIcon;
          if (typeof pageIndex === "boolean")
            data[indexRouteMetaKey] = pageIndex ? 1 : 0;
          if (typeof pageOrder === "number")
            data[orderRouteMetaKey] = pageOrder;

          page.routeMeta = { ...page.routeMeta, ...data };
        }
      },

      onInitialized: (app): Promise<void> => generateCatalog(app, options),

      ...(component ? {} : { clientConfigFile: `${CLIENT_FOLDER}config.js` }),
    };
  };
