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
import type { BlogOptions } from "./options.js";
import { getPageExcerpt } from "./excerpt.js";

export const blogPlugin =
  (options: BlogOptions): PluginFunction =>
  (app) => {
    const {
      getInfo = (): Record<string, never> => ({}),
      filter = (page): boolean =>
        Boolean(page.filePathRelative) && !page.frontmatter["home"],
      metaScope = "_blog",
      customElement = () => false,
      excerpt = true,
      excerptSeparator = "<!-- more -->",
      excerptLength = 300,
      excerptFilter = filter,
    } = options;

    let generatePageKeys: string[] = [];

    if (app.env.isDebug) logger.info(`Options: ${options.toString()}`);

    return {
      name: "vuepress-plugin-blog2",

      define: () => ({
        BLOG_META_SCOPE: metaScope,
      }),

      extendsPage: (page): void => {
        if (
          excerpt &&
          excerptFilter(page) &&
          // TODO: Remove this once @vuepress/core no longer generate excerpt
          !page.excerpt &&
          !page.data.excerpt
        ) {
          page.excerpt = page.data.excerpt = getPageExcerpt(app, page, {
            customElement,
            excerptSeparator,
            excerptLength,
          });
        }

        if (filter(page)) {
          page.routeMeta = {
            ...(metaScope === ""
              ? getInfo(page)
              : { [metaScope]: getInfo(page) }),
            ...page.routeMeta,
          };
        }
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
        const hotReload =
          "hotReload" in options ? options.hotReload : app.env.isDebug;

        if (hotReload) {
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
              const pagesToBeRemoved = generatePageKeys.filter(
                (key) => !newGeneratedPageKeys.includes(key)
              );
              const pagesToBeAdded = newGeneratedPageKeys.filter(
                (key) => !generatePageKeys.includes(key)
              );

              if (pagesToBeAdded.length) {
                if (app.env.isDebug)
                  logger.info(
                    `New pages detected: ${pagesToBeAdded.toString()}`
                  );

                // prepare page files
                await Promise.all(
                  pagesToBeAdded.map(async (pageKey) => {
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
              if (pagesToBeRemoved.length) {
                if (app.env.isDebug)
                  logger.info(
                    `Removing following pages: ${pagesToBeRemoved.toString()}`
                  );

                pagesToBeRemoved.forEach((pageKey) => {
                  app.pages.splice(
                    app.pages.findIndex(({ key }) => key === pageKey),
                    1
                  );
                });
              }

              // prepare pages entry
              if (pagesToBeRemoved.length || pagesToBeAdded.length) {
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
