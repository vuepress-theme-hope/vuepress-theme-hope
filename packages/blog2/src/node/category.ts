import { createPage } from "@vuepress/core";
import { logger, removeLeadingSlash } from "./utils";

import type { App, Page } from "@vuepress/core";
import type { BlogOptions, CategoryMap, PageMap } from "../shared";

const HMR_CODE = `
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateBlogCategory) {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoryMap)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ categoryMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoryMap)
  })
}
`;

export const prepareCategory = (
  app: App,
  options: Partial<BlogOptions>,
  pageMap: PageMap,
  init = false
): Promise<string[]> => {
  const {
    category = [],
    slugify = (name: string): string =>
      name.replace(/[ _]/g, "-").toLowerCase(),
  } = options;

  return Promise.all(
    category.map(
      async (
        {
          key,
          getter,
          sorter = (): number => -1,
          path = "",
          layout = "Layout",
          title = {},
          itemPath = "",
          itemLayout = "Layout",
          itemTitle = {},
        },
        index
      ) => {
        if (typeof key !== "string" || !key) {
          logger.error(`Invalid 'key' option ${key} in 'category[${index}]'`);

          return null;
        }

        if (typeof getter !== "function") {
          logger.error(
            `Invalid 'getter' option in 'category[${index}]', it should be a function!`
          );

          return null;
        }

        if (app.env.isDebug) logger.info(`Generating ${key} category.\n`);

        const categoryMap: CategoryMap = {};
        const pageKeys: string[] = [];
        const getItemPath =
          typeof itemPath === "function"
            ? itemPath
            : (name: string): string =>
                itemPath
                  .replace(/:key/g, slugify(key))
                  .replace(/:name/g, slugify(name));
        const getItemTitle =
          typeof itemTitle === "function"
            ? itemTitle
            : (localePath: string): string =>
                itemTitle[localePath]?.replace(/:key/g, key) || "";

        for (const routeLocale in pageMap) {
          if (path) {
            const pageTitle =
              typeof title === "function"
                ? title(routeLocale)
                : title[routeLocale]?.replace(/:key/g, key) || "";
            const pagePath = `${routeLocale}${removeLeadingSlash(
              path.replace(/:key/g, slugify(key))
            )}`;

            const mainPage = await createPage(app, {
              path: pagePath,
              frontmatter: {
                title: pageTitle,
                blog: {
                  type: "category",
                  key,
                },
                layout,
              },
            });

            const index = app.pages.findIndex(({ path }) => path === pagePath);

            if (index === -1) app.pages.push(mainPage);
            else if (app.pages[index].key !== mainPage.key) {
              app.pages.splice(index, 1, mainPage);

              if (init) logger.warn(`Overiding existed path ${pagePath}`);
            }
            pageKeys.push(mainPage.key);

            categoryMap[routeLocale] = {
              path: mainPage.path,
              map: {},
            };
          } else {
            categoryMap[routeLocale] = {
              path: "",
              map: {},
            };
          }

          const { map } = categoryMap[routeLocale];
          const pageMapStore: Record<string, Page[]> = {};

          for (const page of pageMap[routeLocale]) {
            const categories = getter(page);

            for (const category of categories) {
              if (!map[category]) {
                const itemTitle = getItemTitle(routeLocale, category);
                const itemPath = getItemPath(category);

                if (itemPath) {
                  const pagePath = `${routeLocale}${removeLeadingSlash(
                    itemPath
                  )}`;

                  const page = await createPage(app, {
                    path: `${routeLocale}${removeLeadingSlash(itemPath)}`,
                    frontmatter: {
                      title: itemTitle,
                      blog: {
                        type: "category",
                        name: category,
                        key,
                      },
                      layout: itemLayout,
                    },
                  });

                  const index = app.pages.findIndex(
                    ({ path }) => path === pagePath
                  );

                  if (index === -1) app.pages.push(page);
                  else if (app.pages[index].key !== page.key) {
                    app.pages.splice(index, 1, page);

                    if (init) logger.warn(`Overiding existed path ${pagePath}`);
                  }

                  pageKeys.push(page.key);

                  map[category] = {
                    path: page.path,
                    keys: [],
                  };
                } else {
                  map[category] = {
                    path: "",
                    keys: [],
                  };
                }

                pageMapStore[category] = [];
              }

              pageMapStore[category].push(page);
            }
          }

          for (const category in pageMapStore)
            map[category].keys = pageMapStore[category]
              .sort(sorter)
              .map(({ key }) => key);

          if (app.env.isDebug) {
            let infoMessage = `Route ${routeLocale} in ${key} cateogry:\n`;

            for (const category in map) {
              const { path, keys } = map[category];

              infoMessage += `name: ${category}; ${
                path ? `path: ${path}; ` : ""
              }items: ${keys.length}\n`;
            }

            logger.info(infoMessage);
          }
        }

        return {
          key,
          map: categoryMap,
          pageKeys,
        };
      }
    )
  ).then(async (result) => {
    const finalMap: Record<string, CategoryMap> = {};
    const keys: string[] = [];

    result
      .filter(
        (
          item
        ): item is {
          key: string;
          map: CategoryMap;
          pageKeys: string[];
        } => item !== null
      )
      .forEach(({ key, map, pageKeys }) => {
        finalMap[key] = map;
        keys.push(...pageKeys);
      });

    await app.writeTemp(
      `blog/category.js`,
      `export const categoryMap = ${JSON.stringify(finalMap)}\n${HMR_CODE}`
    );

    if (app.env.isDebug) logger.info("All categories generated.");

    return keys;
  });
};
