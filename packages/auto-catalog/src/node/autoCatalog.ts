import { createPage } from "@vuepress/core";
import { getTitleFromFilename } from "vuepress-shared/node";
import { logger } from "./utils.js";

import type { App, PageFrontmatter } from "@vuepress/core";
import type { AutoCatalogOptions } from "./options.js";

export const generateCatalog = async (
  app: App,
  {
    component = "AutoCatalog",
    exclude = [],
    frontmatter = (): PageFrontmatter => ({}),
    level = 3,
  }: AutoCatalogOptions
): Promise<void> => {
  const {
    env: { isDebug },
    pages,
  } = app;

  const pathToBeGenerated = new Set<string>();
  const content = `\
<${component}${[1, 2].includes(level) ? ` :level="${level}"` : ""} />
`;

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
    Array.from(pathToBeGenerated)
      .map((path) => decodeURI(path))
      .map((path) => {
        const [, basename] = /\/([^/]+)\/?$/.exec(path) || [];
        const title = getTitleFromFilename(basename);

        return createPage(app, {
          frontmatter: {
            title,
            ...(frontmatter(path) || {}),
          },
          content,
          path,
        });
      })
  ).then((pages) => {
    app.pages.push(...pages);
  });
};
