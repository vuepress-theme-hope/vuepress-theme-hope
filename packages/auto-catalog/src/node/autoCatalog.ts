import type { App, PageFrontmatter } from "@vuepress/core";
import { createPage } from "@vuepress/core";
import { getTitleFromFilename } from "vuepress-shared/node";

import type { AutoCatalogOptions } from "./options.js";
import { logger } from "./utils.js";

export const injectCatalogInformation = (
  { pages }: App,
  {
    component,
    iconGetter,
    iconRouteMetaKey = "icon",
    shouldIndex,
    indexRouteMetaKey = "index",
    orderGetter,
    orderRouteMetaKey = "order",
    titleGetter = (page): string => page.title,
    titleRouteMetaKey = "title",
  }: AutoCatalogOptions
): void => {
  if (!component)
    pages.forEach((page) => {
      const data: Record<string, unknown> = {};

      const pageTitle = titleGetter?.(page);
      const pageIcon = iconGetter?.(page);
      const pageIndex = shouldIndex?.(page) ?? null;
      const pageOrder = orderGetter?.(page) ?? null;

      if (pageTitle) data[titleRouteMetaKey] = pageTitle;
      if (pageIcon) data[iconRouteMetaKey] = pageIcon;
      if (typeof pageIndex === "boolean")
        data[indexRouteMetaKey] = pageIndex ? 1 : 0;
      if (typeof pageOrder === "number") data[orderRouteMetaKey] = pageOrder;

      page.routeMeta = { ...page.routeMeta, ...data };
    });
};

export const generateCatalog = async (
  app: App,
  {
    component = "AutoCatalog",
    exclude = [],
    frontmatter = (): PageFrontmatter => ({}),
    level = 3,
    index = false,
  }: AutoCatalogOptions
): Promise<void> => {
  const {
    env: { isDebug },
    pages,
  } = app;

  const pathToBeGenerated = new Set<string>();
  const content = `\
<${component}${[1, 2].includes(level) ? ` :level="${level}"` : ""}${
    index ? " index" : ""
  }/>
`;

  pages.forEach(({ path: pagePath, pathLocale }) => {
    let catalogPath = pagePath;

    // not 404 page
    if (pagePath !== "/404.html")
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
        const [, basename = ""] = /\/([^/]+)\/?$/.exec(path) || [];
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
