import type { App, Page, PageOptions } from "vuepress/core";
import { createPage } from "vuepress/core";
import { colors } from "vuepress/utils";

import { logger } from "../utils.js";

export const addPage = async (
  app: App,
  pageOptions: PageOptions,
  allowOverride = false
): Promise<Page> => {
  const page = await createPage(app, pageOptions);

  const existingIndex = app.pages.findIndex(({ path }) => path === page.path);

  if (existingIndex === -1) {
    app.pages.push(page);

    return page;
  }

  if (app.pages[existingIndex].key === page.key)
    return app.pages[existingIndex];

  app.pages.splice(existingIndex, 1, page);

  if (!allowOverride)
    logger.warn(`Overriding existed path ${colors.cyan(page.path)}`);

  return page;
};
