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
  pageMap: PageMap
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
          itemPath = "",
          itemLayout = "Layout",
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
        const pagePaths: string[] = [];
        const getItemPath =
          typeof itemPath === "function"
            ? itemPath
            : (name: string): string =>
                itemPath
                  .replace(/:key/g, slugify(key))
                  .replace(/:name/g, slugify(name));

        for (const routeLocale in pageMap) {
          if (path) {
            const mainPage = await createPage(app, {
              path: `${routeLocale}${removeLeadingSlash(
                path.replace(/:key/g, slugify(key))
              )}`,
              frontmatter: {
                blog: {
                  type: "category",
                  key,
                },
                layout,
              },
            });

            app.pages.push(mainPage);
            pagePaths.push(mainPage.path);

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
                const itemPath = getItemPath(category);

                if (itemPath) {
                  const page = await createPage(app, {
                    path: `${routeLocale}${removeLeadingSlash(itemPath)}`,
                    frontmatter: {
                      blog: {
                        type: "category",
                        name: category,
                        key,
                      },
                      layout: itemLayout,
                    },
                  });

                  app.pages.push(page);
                  pagePaths.push(page.path);

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
              }items: ${keys.length}`;
            }

            logger.info(infoMessage);
          }
        }

        return {
          key,
          map: categoryMap,
          pagePaths,
        };
      }
    )
  ).then(async (result) => {
    const finalMap: Record<string, CategoryMap> = {};
    const paths: string[] = [];

    result
      .filter(
        (
          item
        ): item is {
          key: string;
          map: CategoryMap;
          pagePaths: string[];
        } => item !== null
      )
      .forEach(({ key, map, pagePaths }) => {
        finalMap[key] = map;
        paths.push(...pagePaths);
      });

    await app.writeTemp(
      `blog/category.js`,
      `export const categoryMap = ${JSON.stringify(finalMap)}\n${HMR_CODE}`
    );

    if (app.env.isDebug) logger.info("All types generated.");

    return paths;
  });
};
