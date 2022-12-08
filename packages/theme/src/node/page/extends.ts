import { injectLocalizedDate } from "vuepress-shared/node";
import { injectPageInfo } from "./info.js";

import type { Page } from "@vuepress/core";
import type { ThemePageData } from "../../shared/index.js";

export const extendsPage = (page: Page<ThemePageData>): void => {
  injectLocalizedDate(page);
  injectPageInfo(page);
};
