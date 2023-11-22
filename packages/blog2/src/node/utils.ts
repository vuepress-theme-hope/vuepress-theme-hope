import type { App, Page } from "@vuepress/core";
import { Logger, keys } from "vuepress-shared/node";

import type { PageMap } from "./typings/index.js";

export const PLUGIN_NAME = "vuepress-plugin-blog2";

export const logger = new Logger(PLUGIN_NAME);

export const getPageMap = (
  { options, pages }: App,
  filter: (page: Page) => boolean,
): PageMap => {
  const localePaths = keys(options.locales);
  const pageMap: PageMap = {};

  // initialize pageMap
  // extra check to ensure at least one locale exists
  (localePaths.length ? localePaths : ["/"]).forEach((path) => {
    pageMap[path] = [];
  });

  pages.filter(filter).forEach((page) => {
    if (page.path !== "/404.html") pageMap[page.pathLocale].push(page);
  });

  return pageMap;
};
