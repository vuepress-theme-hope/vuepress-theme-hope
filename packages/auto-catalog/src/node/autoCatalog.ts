import { createPage } from "@vuepress/core";
import { getTitleFromFilename } from "vuepress-shared/node";
import { logger } from "./utils.js";

import type { App, PageFrontmatter } from "@vuepress/core";
import type { AutoCatalogOptions } from "./options.js";

export const generateCatalog = async (
  app: App,
  {
    exclude = [],
    getFrontmatter = (path): PageFrontmatter => {
      const [, basename] = /\/([^/]+\/?)$/.exec(path) || [];
      const title = getTitleFromFilename(basename);

      return { title };
    },
  }: AutoCatalogOptions
): Promise<void> => {
  const {
    env: { isDebug },
    pages,
  } = app;

  const pathToBeGenerated = new Set<string>();

  pages.map(({ path: pagePath, pathLocale }) => {
    let catalogPath = pagePath.replace(/\/(?:[^/]+\/?)$/, "/");

    while (catalogPath !== pathLocale) {
      if (
        // not discovered yet
        !pathToBeGenerated.has(catalogPath) &&
        // not being excluded
        exclude.every((pattern) => !catalogPath.match(pattern)) &&
        // path not found
        pages.every(({ path }) => path !== catalogPath)
      ) {
        if (isDebug) logger.info(`Generating catalog ${catalogPath}}`);

        pathToBeGenerated.add(catalogPath);
      }

      catalogPath = catalogPath.replace(/\/[^/]+\/?$/, "/");
    }
  });

  await Promise.all(
    Array.from(pathToBeGenerated).map(async (catalogPath) => {
      app.pages.push(
        await createPage(app, {
          content: `\
<Catalog />
`,
          frontmatter: getFrontmatter(catalogPath),
          path: catalogPath,
        })
      );
    })
  );
};
