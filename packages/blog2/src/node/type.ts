import type { App } from "@vuepress/core";
import { createPage } from "@vuepress/core";
import { colors } from "@vuepress/utils";
import { isString, removeLeadingSlash } from "vuepress-shared/node";

import type { BlogOptions } from "./options.js";
import type { PageMap } from "./typings/index.js";
import { logger } from "./utils.js";
import type { TypeMap } from "../shared/index.js";

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
  { type, slugify }: Required<Pick<BlogOptions, "type" | "slugify">>,
  pageMap: PageMap,
  init = false,
): Promise<string[]> =>
  Promise.all(
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
        index,
      ) => {
        if (!isString(key) || !key.length) {
          logger.error(
            `Invalid ${colors.magenta("key")} option ${colors.cyan(
              key,
            )} in ${colors.cyan(`type[${index}]`)}`,
          );

          return null;
        }

        const typeMap: TypeMap = {};
        const pageKeys: string[] = [];

        if (app.env.isDebug)
          logger.info(`Generating ${colors.cyan(key)} type.\n`);

        for (const localePath in pageMap) {
          const keys = pageMap[localePath]
            .filter(filter)
            .sort(sorter)
            .map(({ key }) => key);

          if (path) {
            const pagePath = `${localePath}${removeLeadingSlash(
              slugify(path.replace(/:key/g, key)),
            )}`;

            const page = await createPage(app, {
              path: encodeURI(pagePath),
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

            if (index === -1) {
              app.pages.push(page);
            } else if (app.pages[index].key !== page.key) {
              app.pages.splice(index, 1, page);

              if (init)
                logger.warn(`Overriding existed path ${colors.cyan(pagePath)}`);
            }

            pageKeys.push(page.key);

            typeMap[localePath] = { path: page.path, keys };

            if (app.env.isDebug)
              logger.info(
                `Route ${localePath} in ${key} type: path: ${page.path}; items: ${keys.length}\n`,
              );
          } else {
            typeMap[localePath] = { path: "", keys };

            if (app.env.isDebug)
              logger.info(
                `Route ${localePath} in ${key} type: items: ${keys.length}\n`,
              );
          }
        }

        return {
          key,
          map: typeMap,
          pageKeys,
        };
      },
    ),
  ).then(async (result) => {
    const finalMap: Record<string, TypeMap> = {};
    const keys: string[] = [];

    result
      .filter(
        (
          item,
        ): item is {
          key: string;
          map: TypeMap;
          pageKeys: string[];
        } => item !== null,
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
`,
    );

    if (app.env.isDebug) logger.info("All types generated.");

    return keys;
  });
