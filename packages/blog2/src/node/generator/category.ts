import type { App, Page } from "vuepress/core";
import { colors } from "vuepress/utils";
import { isFunction, isString, removeLeadingSlash } from "vuepress-shared/node";

import { addPage } from "./addPage.js";
import type { Store } from "./store.js";
import type { CategoryMap } from "../../shared/index.js";
import type { BlogOptions } from "../options.js";
import type { PageMap } from "../typings/index.js";
import { logger } from "../utils.js";

const HMR_CODE = `
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogCategory)
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoryMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ categoryMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoryMap);
  });

`;

export const prepareCategory = (
  app: App,
  { category, slugify }: Required<Pick<BlogOptions, "category" | "slugify">>,
  pageMap: PageMap,
  store: Store,
  allowOverride = false
): Promise<string[]> =>
  Promise.all(
    category.map(
      async (
        {
          key,
          getter,
          sorter = (): number => -1,
          path = "/:key/",
          layout = "Layout",
          frontmatter = (): Record<string, string> => ({}),
          itemPath = "/:key/:name/",
          itemLayout = "Layout",
          itemFrontmatter = (): Record<string, string> => ({}),
        },
        index
      ) => {
        // check key option
        if (!isString(key) || !key) {
          logger.error(
            `Invalid ${colors.magenta("key")} option ${colors.cyan(
              key
            )} in ${colors.cyan(`category[${index}]`)}`
          );

          return null;
        }

        // check getter option
        if (!isFunction(getter)) {
          logger.error(
            `Invalid ${colors.magenta("getter")} option in "${colors.cyan(
              `category[${index}]`
            )}", it should be a function!`
          );

          return null;
        }

        if (app.env.isDebug)
          logger.info(`Generating ${colors.cyan(key)} category.\n`);

        const categoryMap: CategoryMap = {};
        const pageKeys: string[] = [];

        const getItemPath = isFunction(itemPath)
          ? itemPath
          : isString(itemPath)
            ? (name: string): string =>
                itemPath
                  .replace(/:key/g, slugify(key))
                  .replace(/:name/g, slugify(name))
            : (): null => null;

        for (const localePath in pageMap) {
          if (path) {
            const pagePath = `${localePath}${removeLeadingSlash(
              path.replace(/:key/g, slugify(key))
            )}`;

            const page = await addPage(
              app,
              {
                path: encodeURI(pagePath),
                frontmatter: {
                  ...frontmatter(localePath),
                  blog: {
                    type: "category",
                    key,
                  },
                  layout,
                },
              },
              allowOverride
            );

            pageKeys.push(page.key);

            categoryMap[localePath] = {
              path: page.path,
              map: {},
            };
          } else {
            categoryMap[localePath] = {
              path: "",
              map: {},
            };
          }

          const { map } = categoryMap[localePath];
          const pageMapStore: Record<string, Page[]> = {};

          for (const page of pageMap[localePath]) {
            const categories = getter(page);

            for (const category of categories) {
              if (!map[category]) {
                const itemPath = getItemPath(category);

                if (itemPath) {
                  const page = await addPage(
                    app,
                    {
                      path: `${localePath}${removeLeadingSlash(itemPath)}`,
                      frontmatter: {
                        ...itemFrontmatter(category, localePath),
                        blog: {
                          type: "category",
                          name: category,
                          key,
                        },
                        layout: itemLayout,
                      },
                    },
                    allowOverride
                  );

                  pageKeys.push(page.key);

                  map[category] = {
                    path: page.path,
                    items: [],
                  };
                } else {
                  map[category] = {
                    path: "",
                    items: [],
                  };
                }

                pageMapStore[category] = [];
              }

              pageMapStore[category].push(page);
            }
          }

          for (const category in pageMapStore)
            map[category].items = store.addItems(
              pageMapStore[category].sort(sorter).map(({ path }) => path)
            );

          if (app.env.isDebug) {
            let infoMessage = `Route ${localePath} in ${key} category:\n`;

            for (const category in map) {
              const { path, items } = map[category];

              infoMessage += `name: ${category}; ${
                path ? `path: ${path}; ` : ""
              }items: ${items.length}\n`;
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
      `\
export const categoryMap = ${JSON.stringify(finalMap)};
${app.env.isDev ? HMR_CODE : ""}
`
    );

    if (app.env.isDebug) logger.info("All categories generated.");

    return keys;
  });
