import {
  type PluginFunction,
  preparePageComponent,
  preparePageData,
  preparePagesComponents,
  preparePagesData,
  preparePagesRoutes,
} from "@vuepress/core";
import { watch } from "chokidar";
import { checkVersion, getPageExcerpt } from "vuepress-shared/node";

import { prepareCategory } from "./category.js";
import { convertOptions } from "./compact.js";
import { type BlogOptions, type PageWithExcerpt } from "./options.js";
import { prepareType } from "./type.js";
import { PLUGIN_NAME, getPageMap, logger } from "./utils.js";

export const blogPlugin =
  (options: BlogOptions, legacy = true): PluginFunction =>
  (app) => {
    // TODO: Remove this in v2 stable
    if (legacy)
      convertOptions(options as BlogOptions & Record<string, unknown>);

    checkVersion(app, PLUGIN_NAME, "2.0.0-beta.62");

    const {
      getInfo = (): Record<string, never> => ({}),
      filter = (page): boolean =>
        Boolean(page.filePathRelative) && !page.frontmatter["home"],
      metaScope = "_blog",
      excerpt = true,
      excerptSeparator = "<!-- more -->",
      excerptLength = 300,
      excerptFilter = filter,
      isCustomElement = (): boolean => false,
      category = [],
      type = [],
      slugify = (name: string): string =>
        name
          .replace(/[ _]/g, "-")
          .replace(/[:?*|\\/<>]/g, "")
          .toLowerCase(),
    } = options;

    let generatePageKeys: string[] = [];

    if (app.env.isDebug) logger.info("Options:", options);

    return {
      name: PLUGIN_NAME,

      define: () => ({
        BLOG_META_SCOPE: metaScope,
      }),

      extendsPage: (page): void => {
        // generate page excerpt
        if (excerpt && excerptFilter(page))
          (<PageWithExcerpt>page).data["excerpt"] = getPageExcerpt(app, page, {
            isCustomElement,
            excerptSeparator,
            excerptLength,
          });
      },

      onInitialized: (app): Promise<void> => {
        const pageMap = getPageMap(app, filter);

        // inject meta information
        app.pages.filter(filter).forEach((page) => {
          page.routeMeta = {
            ...(metaScope === ""
              ? getInfo(page)
              : { [metaScope]: getInfo(page) }),
            ...page.routeMeta,
          };
        });

        return Promise.all([
          prepareCategory(app, { category, slugify }, pageMap, true).then(
            (pageKeys) => {
              generatePageKeys.push(...pageKeys);
            }
          ),
          prepareType(app, { type, slugify }, pageMap, true).then(
            (pageKeys) => {
              generatePageKeys.push(...pageKeys);
            }
          ),
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

            const pageMap = getPageMap(app, filter);

            return Promise.all([
              prepareCategory(app, { category, slugify }, pageMap).then(
                (pageKeys) => {
                  newGeneratedPageKeys.push(...pageKeys);
                }
              ),
              prepareType(app, { type, slugify }, pageMap).then((pageKeys) => {
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
