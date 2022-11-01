import { createPage } from "@vuepress/core";
import { removeLeadingSlash } from "@vuepress/shared";
import { logger } from "./utils.js";

import type { App } from "@vuepress/core";
import type { BlogOptions, PageMap, TypeMap } from "../shared/index.js";

const HMR_CODE = `
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogType)
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ typeMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap);
  });
`;

export const prepareType = (
  app: App,
  options: Partial<BlogOptions>,
  pageMap: PageMap,
  init = false
): Promise<string[]> => {
  const {
    type = [],
    slugify = (name: string): string =>
      name
        .replace(/[ _]/g, "-")
        .replace(/[:?*|\\/<>]/g, "")
        .toLowerCase(),
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
          frontmatter = (): Record<string, string> => ({}),
        },
        index
      ) => {
        if (typeof key !== "string" || !key) {
          logger.error(`Invalid 'key' option ${key} in 'category[${index}]'`);

          return null;
        }

        const typeMap: TypeMap = {};
        const pageKeys: string[] = [];

        if (app.env.isDebug) logger.info(`Generating ${key} type.\n`);

        for (const localePath in pageMap) {
          const keys = pageMap[localePath]
            .filter(filter)
            .sort(sorter)
            .map(({ key }) => key);

          if (path) {
            const pagePath = `${localePath}${removeLeadingSlash(
              slugify(path.replace(/:key/g, key))
            )}`;

            const page = await createPage(app, {
              path: pagePath,
              frontmatter: {
                ...frontmatter(localePath),
                blog: {
                  type: "type",
                  key,
                },
                layout,
              },
            });

            const index = app.pages.findIndex(({ path }) => path === pagePath);

            if (index === -1) app.pages.push(page);
            else if (app.pages[index].key !== page.key) {
              app.pages.splice(index, 1, page);

              if (init) logger.warn(`Overriding existed path ${pagePath}`);
            }

            pageKeys.push(page.key);

            typeMap[localePath] = { path: page.path, keys };

            if (app.env.isDebug)
              logger.info(
                `Route ${localePath} in ${key} type: path: ${page.path}; items: ${keys.length}\n`
              );
          } else {
            typeMap[localePath] = { path: "", keys };

            if (app.env.isDebug)
              logger.info(
                `Route ${localePath} in ${key} type: items: ${keys.length}\n`
              );
          }
        }

        return {
          key,
          map: typeMap,
          pageKeys,
        };
      }
    )
  ).then(async (result) => {
    const finalMap: Record<string, TypeMap> = {};
    const keys: string[] = [];

    result
      .filter(
        (
          item
        ): item is {
          key: string;
          map: TypeMap;
          pageKeys: string[];
        } => item !== null
      )
      .forEach(({ key, map, pageKeys }) => {
        finalMap[key] = map;
        keys.push(...pageKeys);
      });

    await app.writeTemp(
      `blog/type.js`,
      `\
export const typeMap = ${JSON.stringify(finalMap)};
${app.env.isDev ? HMR_CODE : ""}
`
    );

    if (app.env.isDebug) logger.info("All types generated.");

    return keys;
  });
};
