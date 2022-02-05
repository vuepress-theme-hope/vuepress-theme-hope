import { createPage } from "@vuepress/core";
import { logger, removeLeadingSlash } from "./utils";

import type { App } from "@vuepress/core";
import type { BlogOptions, PageMap, TypeMap } from "../shared";

const HMR_CODE = `
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateBlogType) {
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ typeMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap)
  })
}
`;

export const prepareType = (
  app: App,
  options: Partial<BlogOptions>,
  pageMap: PageMap
): Promise<string[]> => {
  const {
    type = [],
    slugify = (name: string): string =>
      name.replace(/[ _]/g, "-").toLowerCase(),
  } = options;

  return Promise.all(
    type.map(
      async (
        {
          key,
          sorter = (): number => -1,
          filter = (): boolean => true,
          path = "/:key/",
          layout = "Layout",
        },
        index
      ) => {
        if (typeof key !== "string" || !key) {
          logger.error(`Invalid 'key' option ${key} in 'category[${index}]'`);

          return null;
        }

        const typeMap: TypeMap = {};
        const pagePaths: string[] = [];

        for (const routeLocale in pageMap) {
          const page = await createPage(app, {
            path: `${routeLocale}${removeLeadingSlash(
              slugify(path.replace(/:key/g, key))
            )}`,
            frontmatter: {
              type: "type",
              key,
              layout,
            },
          });

          app.pages.push(page);
          pagePaths.push(page.path);

          typeMap[routeLocale] = {
            path: page.path,
            keys: pageMap[routeLocale]
              .filter(filter)
              .sort(sorter)
              .map(({ key }) => key),
          };
        }

        return {
          key,
          map: typeMap,
          pagePaths,
        };
      }
    )
  ).then(async (result) => {
    const finalMap: Record<string, TypeMap> = {};
    const paths: string[] = [];

    result
      .filter(
        (
          item
        ): item is {
          key: string;
          map: TypeMap;
          pagePaths: string[];
        } => item !== null
      )
      .forEach(({ key, map, pagePaths }) => {
        finalMap[key] = map;
        paths.push(...pagePaths);
      });

    await app.writeTemp(
      `blog/type.js`,
      `export const typeMap = ${JSON.stringify(finalMap)}\n${HMR_CODE}`
    );

    return paths;
  });
};
