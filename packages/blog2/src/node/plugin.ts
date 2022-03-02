import {
  addViteSsrNoExternal,
  addViteOptimizeDepsExclude,
} from "@mr-hope/vuepress-shared";
import {
  preparePagesComponents,
  preparePagesData,
  preparePagesRoutes,
} from "@vuepress/core";
import chokidar from "chokidar";

import { prepareCategory } from "./category";
import { prepareType } from "./type";
import { getPageMap, logger } from "./utils";

import type { Plugin, PluginConfig } from "@vuepress/core";
import type { BlogOptions } from "../shared";

export const blogPlugin: Plugin<BlogOptions> = (options) => {
  const { metaScope = "_blog" } = options;

  let generatePageKeys: string[] = [];

  return {
    name: "vuepress-plugin-blog2",

    define: () => ({
      BLOG_META_SCOPE: metaScope,
    }),

    extendsPage: (page): void => {
      const { getInfo = (): Record<string, never> => ({}) } = options;

      page.routeMeta = {
        ...(metaScope === "" ? getInfo(page) : { [metaScope]: getInfo(page) }),
        ...page.routeMeta,
      };
    },

    onInitialized: (app): Promise<void> => {
      addViteSsrNoExternal(app, [
        "@mr-hope/vuepress-shared",
        "vuepress-plugin-blog2",
      ]);
      addViteOptimizeDepsExclude(app, "vuepress-plugin-blog2");

      const pageMap = getPageMap(options, app);

      return Promise.all([
        prepareCategory(app, options, pageMap, true).then((pageKeys) => {
          generatePageKeys.push(...pageKeys);
        }),
        prepareType(app, options, pageMap, true).then((pageKeys) => {
          generatePageKeys.push(...pageKeys);
        }),
      ]).then(() => {
        if (app.env.isDebug) logger.info("temp file generated");
      });
    },

    onWatched: (app, watchers): void => {
      if (options.hotReload) {
        const pageDataWatcher = chokidar.watch("pages/**/*.js", {
          cwd: app.dir.temp(),
          ignoreInitial: true,
        });

        const updateBlog = (): Promise<void> => {
          const newGeneratedPageKeys: string[] = [];

          const pageMap = getPageMap(options, app);

          return Promise.all([
            prepareCategory(app, options, pageMap).then((pageKeys) => {
              newGeneratedPageKeys.push(...pageKeys);
            }),
            prepareType(app, options, pageMap).then((pageKeys) => {
              newGeneratedPageKeys.push(...pageKeys);
            }),
          ]).then(async () => {
            const pagestoBeRemoved = generatePageKeys.filter(
              (key) => !newGeneratedPageKeys.includes(key)
            );

            if (pagestoBeRemoved.length) {
              if (app.env.isDebug)
                logger.info(
                  `Removing following pages: ${pagestoBeRemoved.toString()}`
                );

              // remove pages
              pagestoBeRemoved.forEach((pageKey) => {
                app.pages.splice(
                  app.pages.findIndex(({ key }) => key === pageKey),
                  1
                );
              });

              // prepare pages entry
              await preparePagesComponents(app);
              await preparePagesData(app);
              await preparePagesRoutes(app);
            } else if (
              newGeneratedPageKeys.length !== generatePageKeys.length
            ) {
              if (app.env.isDebug) logger.info("New pages detected");

              // prepare pages entry
              await preparePagesComponents(app);
              await preparePagesData(app);
              await preparePagesRoutes(app);
            }

            generatePageKeys = newGeneratedPageKeys;

            if (app.env.isDebug) logger.info("temp file updated");
          });
        };

        pageDataWatcher.on("add", () => {
          void updateBlog();
        });
        pageDataWatcher.on("change", () => {
          void updateBlog();
        });
        pageDataWatcher.on("unlink", () => {
          void updateBlog();
        });

        watchers.push(pageDataWatcher);
      }
    },
  };
};

export const blog = (
  options: BlogOptions | false
): PluginConfig<BlogOptions> => ["blog2", options];
