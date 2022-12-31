import { createPage } from "@vuepress/core";
import { getTitleFromFilename } from "vuepress-shared/node";
import { logger } from "./utils.js";

import type { App, PageFrontmatter } from "@vuepress/core";
import type { AutoCatalogOptions } from "./options.js";

export const generateCatalog = async (
  app: App,
  {
    exclude = [],
    frontmatter = (): PageFrontmatter => ({}),
  }: AutoCatalogOptions
): Promise<void> => {
  const {
    env: { isDebug },
    pages,
  } = app;

  const pathToBeGenerated = new Set<string>();

  pages.forEach(({ path: pagePath, pathLocale }) => {
    let catalogPath = pagePath;

    while (catalogPath !== pathLocale) {
      catalogPath = catalogPath.replace(/\/(?:[^/]+\/?)$/, "/");

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
    }
  });

  await Promise.all(
    Array.from(pathToBeGenerated).map((catalogPath) => {
      const [, basename] = /\/([^/]+)\/?$/.exec(catalogPath) || [];
      const title = getTitleFromFilename(basename);

      return createPage(app, {
        content: `\
<AutoCatalog />
`,
        frontmatter: {
          title,
          ...(frontmatter(catalogPath) || {}),
        },
        path: catalogPath,
      });
    })
  ).then((pages) => {
    app.pages.push(...pages);
  });
};
