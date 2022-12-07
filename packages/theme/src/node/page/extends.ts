import { injectLocalizedDate } from "vuepress-shared/node";
import { injectBlogInfo } from "./blog.js";
import { injectPageInfo } from "./info.js";

import type { App, Page } from "@vuepress/core";
import type { ThemeStatus } from "../config/status.js";
import type { ThemeData, ThemePageData } from "../../shared/index.js";

export const extendsPage = (
  app: App,
  page: Page<ThemePageData>,
  themeData: ThemeData,
  { autoExcerpt, enableBlog }: ThemeStatus,
  injectContentSensitiveData = false
): void => {
  injectLocalizedDate(page);
  injectPageInfo(page);

  if (enableBlog)
    injectBlogInfo(
      app,
      themeData,
      page,
      autoExcerpt,
      injectContentSensitiveData
    );
};
