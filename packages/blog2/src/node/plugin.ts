import {
  preparePageComponent,
  preparePageData,
  preparePagesComponents,
  preparePagesData,
  preparePagesRoutes,
} from "@vuepress/core";
import { watch } from "chokidar";

import { prepareCategory } from "./category.js";
import { prepareType } from "./type.js";
import { getPageMap, logger } from "./utils.js";

import type { PluginFunction } from "@vuepress/core";
import type { BlogOptions } from "../shared/index.js";

export const blogPlugin =
  (options: BlogOptions): PluginFunction =>
  (app) => {
    const {
      getInfo = (): Record<string, never> => ({}),
      filter = (page): boolean =>
        Boolean(page.filePathRelative) && !page.frontmatter["home"],
      metaScope = "_blog",
    } = options;

    let generatePageKeys: string[] = [];

    if (app.env.isDebug) logger.info(`Options: ${options.toString()}`);

    return {
      name: "vuepress-plugin-blog2",

      define: () => ({
        BLOG_META_SCOPE: metaScope,
      }),

      extendsPage: (page): void => {
        if (filter(page))
          page.routeMeta = {
            ...(metaScope === ""
              ? getInfo(page)
              : { [metaScope]: getInfo(page) }),
            ...page.routeMeta,
          };
      },

      onInitialized: (app): Promise<void> => {
        const pageMap = getPageMap(filter, app);

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
          const pageDataWatcher = watch("pages/**/*.js", {
            cwd: app.dir.temp(),
            ignoreInitial: true,
          });

          const updateBlog = (): Promise<void> => {
            const newGeneratedPageKeys: string[] = [];

            const pageMap = getPageMap(filter, app);

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
              const pagestoBeAdded = newGeneratedPageKeys.filter(
                (key) => !generatePageKeys.includes(key)
              );

              if (pagestoBeAdded.length) {
                if (app.env.isDebug)
                  logger.info(
                    `New pages detected: ${pagestoBeAdded.toString()}`
                  );

                // prepare page files
                await Promise.all(
                  pagestoBeAdded.map(async (pageKey) => {
                    await preparePageComponent(
                      app,
                      app.pages.find(({ key }) => key === pageKey)!
                    );
                    await preparePageData(
                      app,
                      app.pages.find(({ key }) => key === pageKey)!
                    );
                  })
                );
              }

              // remove pages
              if (pagestoBeRemoved.length) {
                if (app.env.isDebug)
                  logger.info(
                    `Removing following pages: ${pagestoBeRemoved.toString()}`
                  );

                pagestoBeRemoved.forEach((pageKey) => {
                  app.pages.splice(
                    app.pages.findIndex(({ key }) => key === pageKey),
                    1
                  );
                });
              }

              // prepare pages entry
              if (pagestoBeRemoved.length || pagestoBeAdded.length) {
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
