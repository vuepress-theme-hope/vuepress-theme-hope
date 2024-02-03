import { addViteSsrNoExternal, getPageExcerpt } from "@vuepress/helper";
import { watch } from "chokidar";
import type { PluginFunction } from "vuepress/core";
import {
  preparePageComponent,
  preparePageData,
  preparePagesComponents,
  preparePagesData,
  preparePagesRoutes,
} from "vuepress/core";

import { convertOptions } from "./compact.js";
import {
  Store,
  prepareCategory,
  prepareStore,
  prepareType,
} from "./generator/index.js";
import type { BlogOptions, PageWithExcerpt } from "./options.js";
import { PLUGIN_NAME, getPageMap, logger } from "./utils.js";

export const blogPlugin =
  (options: BlogOptions, legacy = true): PluginFunction =>
  (app) => {
    // TODO: Remove this in v2 stable
    if (legacy)
      convertOptions(options as BlogOptions & Record<string, unknown>);

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
    const store = new Store();

    if (app.env.isDebug) logger.info("Options:", options);

    return {
      name: PLUGIN_NAME,

      define: () => ({
        BLOG_META_SCOPE: metaScope,
      }),

      extendsPage: (page): void => {
        // Generate page excerpt
        if (excerpt && excerptFilter(page))
          (<PageWithExcerpt>page).data["excerpt"] = getPageExcerpt(app, page, {
            isCustomElement,
            separator: excerptSeparator,
            length: excerptLength,
          });
      },

      extendsBundlerOptions: (bundlerOptions: unknown, app): void => {
        addViteSsrNoExternal(bundlerOptions, app, [
          "@vuepress/helper",
          "vuepress-shared",
        ]);
      },

      onInitialized: (app): Promise<void> => {
        const pageMap = getPageMap(app, filter);

        // Inject meta information
        app.pages.filter(filter).forEach((page) => {
          page.routeMeta = {
            ...(metaScope === ""
              ? getInfo(page)
              : { [metaScope]: getInfo(page) }),
            ...page.routeMeta,
          };
        });

        return Promise.all([
          prepareCategory(app, { category, slugify }, pageMap, store).then(
            (pageKeys) => {
              generatePageKeys.push(...pageKeys);
            },
          ),
          prepareType(app, { type, slugify }, pageMap, store).then(
            (pageKeys) => {
              generatePageKeys.push(...pageKeys);
            },
          ),
        ])
          .then(() => prepareStore(app, store))
          .then(() => {
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
              prepareCategory(
                app,
                { category, slugify },
                pageMap,
                store,
                true,
              ).then((pageKeys) => {
                newGeneratedPageKeys.push(...pageKeys);
              }),
              prepareType(app, { type, slugify }, pageMap, store, true).then(
                (pageKeys) => {
                  newGeneratedPageKeys.push(...pageKeys);
                },
              ),
            ]).then(async () => {
              await prepareStore(app, store);

              const pagesToBeRemoved = generatePageKeys.filter(
                (key) => !newGeneratedPageKeys.includes(key),
              );
              const pagesToBeAdded = newGeneratedPageKeys.filter(
                (key) => !generatePageKeys.includes(key),
              );

              if (pagesToBeAdded.length) {
                if (app.env.isDebug)
                  logger.info(
                    `New pages detected: ${pagesToBeAdded.toString()}`,
                  );

                // Prepare page files
                await Promise.all(
                  pagesToBeAdded.map(async (pageKey) => {
                    const page = app.pages.find(({ key }) => key === pageKey)!;

                    await preparePageComponent(app, page);
                    await preparePageData(app, page);
                  }),
                );
              }

              // Remove pages
              if (pagesToBeRemoved.length) {
                if (app.env.isDebug)
                  logger.info(
                    `Removing following pages: ${pagesToBeRemoved.toString()}`,
                  );

                pagesToBeRemoved.forEach((pageKey) => {
                  app.pages.splice(
                    app.pages.findIndex(({ key }) => key === pageKey),
                    1,
                  );
                });
              }

              // Prepare pages entry
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
