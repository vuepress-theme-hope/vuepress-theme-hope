import { catalogLocales } from "vuepress-plugin-components";
import { getLocales } from "vuepress-shared/node";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import { generateCatalog } from "./autoCatalog.js";

import type { PageFrontmatter, PluginFunction } from "@vuepress/core";
import type { AutoCatalogOptions } from "./options.js";
import { prepareConfigFile } from "./prepare.js";

export const autoCatalogPlugin =
  ({
    component = "AutoCatalog",
    exclude = [],
    frontmatter = (): PageFrontmatter => ({}),
    getIcon,
    iconRouteMetaKey = "i",
    getIndex,
    indexRouteMetaKey = "I",
    level = 3,
    locales,
    getOrder,
    orderRouteMetaKey = "O",
    getTitle,
    titleRouteMetaKey = "title",
  }: AutoCatalogOptions = {}): PluginFunction =>
  (app) => {
    useSassPalettePlugin(app, { id: "hope" });

    const shouldRegisterComponent = component === "AutoCatalog" || !component;

    return {
      name: "vuepress-plugin-auto-catalog",

      define: (): Record<string, unknown> => ({
        CATALOG_LOCALES: getLocales({
          app,
          name: "catalog",
          default: catalogLocales,
          config: locales,
        }),
      }),

      extendsPage: (page): void => {
        const data: Record<string, unknown> = {};

        const pageTitle = getTitle?.(page);
        const pageIcon = getIcon?.(page);
        const pageOrder = getOrder?.(page);
        const pageIndex = getIndex?.(page);

        if (pageTitle) data[titleRouteMetaKey] = pageTitle;
        if (pageIcon) data[iconRouteMetaKey] = pageIcon;
        if (pageIndex !== false) data[indexRouteMetaKey] = 1;
        if (pageOrder !== null) data[orderRouteMetaKey] = pageOrder;

        page.routeMeta = { ...page.routeMeta, ...data };
      },

      onInitialized: async (app): Promise<void> =>
        generateCatalog(app, { component, exclude, frontmatter, level }),

      ...(shouldRegisterComponent
        ? {
            clientConfigFile: () =>
              prepareConfigFile(app, {
                titleRouteMetaKey,
                iconRouteMetaKey,
                indexRouteMetaKey,
                orderRouteMetaKey,
              }),
          }
        : {}),
    };
  };
