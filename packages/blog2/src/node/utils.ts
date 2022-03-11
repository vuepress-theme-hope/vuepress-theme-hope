import { Logger } from "@mr-hope/vuepress-shared";

import type { App } from "@vuepress/core";
import type { BlogOptions, PageMap } from "../shared";

export const logger = new Logger("vuepress-plugin-blog2");

export const getPageMap = (
  options: Partial<BlogOptions>,
  app: App
): PageMap => {
  const pageMap: PageMap = {};

  // initialize pageMap
  Object.keys({
    // make sure root locale exists
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "/": {},
    ...app.options.locales,
  }).forEach((path) => {
    pageMap[path] = [];
  });

  const {
    filter = (page): boolean =>
      Boolean(page.filePathRelative) && !page.frontmatter.home,
  } = options;

  app.pages.filter(filter).forEach((page) => {
    pageMap[page.pathLocale].push(page);
  });

  return pageMap;
};

export const removeLeadingSlash = (path: string): string =>
  path.replace(/^\//, "");
