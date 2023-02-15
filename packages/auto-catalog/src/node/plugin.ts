import { type PluginFunction } from "@vuepress/core";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import { getLocales } from "vuepress-shared/node";

import { generateCatalog } from "./autoCatalog.js";
import { locales as defaultLocales } from "./locales.js";
import { type AutoCatalogOptions } from "./options.js";
import { CLIENT_FOLDER, logger } from "./utils.js";

export const autoCatalogPlugin =
  (options: AutoCatalogOptions = {}): PluginFunction =>
  (app) => {
    if (app.env.isDebug) logger.info("Options:", options);

    useSassPalettePlugin(app, { id: "hope" });

    const {
      component,
      iconComponent,
      getIcon,
      iconRouteMetaKey = "i",
      getIndex,
      indexRouteMetaKey = "I",
      locales,
      getOrder,
      orderRouteMetaKey = "O",
      getTitle,
      titleRouteMetaKey = "title",
    } = options;

    return {
      name: "vuepress-plugin-auto-catalog",

      define: (): Record<string, unknown> => ({
        AUTO_CATALOG_LOCALES: getLocales({
          app,
          name: "auto-catalog",
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

          const pageTitle = getTitle?.(page);
          const pageIcon = getIcon?.(page);
          const pageIndex = getIndex?.(page) ?? null;
          const pageOrder = getOrder?.(page) ?? null;

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
