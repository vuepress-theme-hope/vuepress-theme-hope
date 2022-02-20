import {
  addViteSsrNoExternal,
  includeViteOptimizeDeps,
  excludeViteOptimizeDeps,
} from "@mr-hope/vuepress-shared";
import {
  preparePagesComponents,
  preparePagesData,
  preparePagesRoutes,
} from "@vuepress/core";
import { prepareCategory } from "./category";
import { prepareType } from "./type";
import { getPageMap, logger } from "./utils";

import type { Plugin, PluginConfig } from "@vuepress/core";
import type { BlogOptions } from "../shared";

export const blogPlugin: Plugin<BlogOptions> = (options, app) => {
  if (app.env.isDev)
    includeViteOptimizeDeps(app, "@mr-hope/vuepress-shared/lib/client");

  addViteSsrNoExternal(app, [
    "@mr-hope/vuepress-shared",
    "vuepress-plugin-blog2",
  ]);
  excludeViteOptimizeDeps(app, "vuepress-plugin-blog2");

  const { metaScope = "_blog" } = options;

  let generatePages: string[] = [];

  return {
    name: "vuepress-plugin-blog2",

    define: () => ({
      BLOG_META_SCOPE: metaScope,
    }),

    extendsPage(page): void {
      const { getInfo = (): Record<string, never> => ({}) } = options;

      page.routeMeta = {
        ...(metaScope === "" ? getInfo(page) : { [metaScope]: getInfo(page) }),
        ...page.routeMeta,
      };
    },

    onInitialized(app): Promise<void> {
      const pageMap = getPageMap(options, app);

      return Promise.all([
        prepareCategory(app, options, pageMap).then((pageKeys) => {
          generatePages.push(...pageKeys);
        }),
        prepareType(app, options, pageMap).then((pageKeys) => {
          generatePages.push(...pageKeys);
        }),
      ]).then(() => {
        if (app.env.isDebug) logger.info("temp file generated");
      });
    },

    onWatched(app): Promise<void> {
      const newGeneratedPages: string[] = [];

      const pageMap = getPageMap(options, app);

      return Promise.all([
        prepareCategory(app, options, pageMap).then((pageKeys) => {
          newGeneratedPages.push(...pageKeys);
        }),
        prepareType(app, options, pageMap).then((pageKeys) => {
          newGeneratedPages.push(...pageKeys);
        }),
      ]).then(async () => {
        if (newGeneratedPages.length !== generatePages.length) {
          // prepare pages entry
          await preparePagesComponents(app);
          await preparePagesData(app);
          await preparePagesRoutes(app);
        } else {
          for (const path of newGeneratedPages) {
            if (!generatePages.includes(path)) {
              // prepare pages entry
              await preparePagesComponents(app);
              await preparePagesData(app);
              await preparePagesRoutes(app);
            }
          }
        }

        generatePages = newGeneratedPages;

        if (app.env.isDebug) logger.info("temp file updated");
      });
    },
  };
};

export const blog = (
  options: BlogOptions | false
): PluginConfig<BlogOptions> => ["blog2", options];
