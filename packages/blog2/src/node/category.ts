import { createPage } from "@vuepress/core";
import { logger } from "./utils";

import type { App } from "@vuepress/core";
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
          path = "/:key/",
          layout = "Layout",
          itemPath = "/:key/:name/",
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

        const categoryMap: CategoryMap = {};
        const pagePaths: string[] = [];
        const getItemPath =
          typeof itemPath === "function"
            ? itemPath
            : (name: string): string =>
                itemPath
                  .replace(/:key/g, slugify(key))
                  .replace(/:name/g, slugify(name));

        const mainPage = await createPage(app, {
          path: path.replace(/:key/g, slugify(key)),
          frontmatter: {
            type: "category",
            key,
            layout,
          },
        });

        app.pages.push(mainPage);
        pagePaths.push(mainPage.path);

        for (const routeLocale in pageMap) {
          categoryMap[routeLocale] = {};

          pageMap[routeLocale].forEach((page) => {
            const categories = getter(page);

            categories.forEach((category) => {
              if (!categoryMap[routeLocale][category])
                categoryMap[routeLocale][category] = [];

              categoryMap[routeLocale][category].push(page.key);
            });
          });
        }

        for (const routeLocale in categoryMap) {
          const categoryRouteMap = categoryMap[routeLocale];

          for (const name in categoryRouteMap) {
            const page = await createPage(app, {
              path: getItemPath(name),
              frontmatter: {
                type: "category",
                name,
                key,
                layout: itemLayout,
              },
            });

            app.pages.push(page);
            pagePaths.push(page.path);
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

    return paths;
  });
};
