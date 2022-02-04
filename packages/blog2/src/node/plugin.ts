import {
  preparePagesComponents,
  preparePagesData,
  preparePagesRoutes,
} from "@vuepress/core";
import { prepareArticle } from "./article";
import { prepareCategory } from "./category";
import { prepareType } from "./type";
import { getPageMap, logger } from "./utils";

import type { Plugin, PluginConfig } from "@vuepress/core";
import type { BlogOptions } from "../shared";

export const blogPlugin: Plugin<BlogOptions> = (options) => {
  const { metaScope = "_blog", injectMeta } = options;

  let generatePages: string[] = [];

  return {
    name: "vuepress-plugin-blog2",

    onInitialized(app): Promise<void> {
      const pageMap = getPageMap(options, app);

      return Promise.all([
        prepareArticle(app, pageMap),
        prepareType(app, options, pageMap).then((pageKeys) => {
          generatePages.push(...pageKeys);
        }),
        prepareCategory(app, options, pageMap).then((pageKeys) => {
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
        prepareArticle(app, pageMap),
        prepareType(app, options, pageMap).then((pageKeys) => {
          newGeneratedPages.push(...pageKeys);
        }),
        prepareCategory(app, options, pageMap).then((pageKeys) => {
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

    extendsPage(page): void {
      page.routeMeta = {
        ...(metaScope === ""
          ? injectMeta?.(page)
          : { [metaScope]: injectMeta?.(page) }),
        ...page.routeMeta,
      };
    },
  };
};

export const blog = (
  options: BlogOptions | false
): PluginConfig<BlogOptions> => [blogPlugin, options];
