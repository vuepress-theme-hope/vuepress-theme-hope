import { logger } from "@vuepress/utils";
import { getCategory, getTag } from "vuepress-shared/node";

import type { Page } from "@vuepress/core";
import type {
  ThemeBlogHomePageFrontmatter,
  ThemeProjectHomePageFrontmatter,
  ThemeNormalPageFrontmatter,
} from "../../shared/index.js";

export const checkFrontmatter = (page: Page, isDebug: boolean): void => {
  const frontmatter = page.frontmatter as
    | ThemeProjectHomePageFrontmatter
    | ThemeBlogHomePageFrontmatter
    | ThemeNormalPageFrontmatter;

  // resolve category
  if ("category" in frontmatter) {
    const category = getCategory(frontmatter.category);

    frontmatter.category = category;
  }

  // resolve tag
  if ("tag" in frontmatter) {
    const tag = getTag(frontmatter.tag);

    frontmatter.tag = tag;
  }

  if (isDebug) {
    const { filePathRelative } = page;

    // check date
    if ("date" in frontmatter && !(frontmatter.date instanceof Date)) {
      logger.error(
        `"date" property in Page FrontMatter should be a valid Date.${
          filePathRelative ? `\nFound in ${filePathRelative}` : ""
        }`
      );

      delete frontmatter.date;
    }

    // check sidebar
    if (
      "sidebar" in frontmatter &&
      frontmatter.sidebar !== "heading" &&
      typeof frontmatter.sidebar !== "boolean"
    ) {
      logger.warn(
        `"sidebar" property in Page FrontMatter should be "heading" or boolean.${
          filePathRelative ? `\nFound in ${filePathRelative}` : ""
        }`
      );

      delete frontmatter.sidebar;
    }

    // check string values
    ["title", "shortTitle", "containerClass"].forEach((key) => {
      if (key in frontmatter && typeof frontmatter[key] !== "string") {
        logger.warn(
          `"${key}" property in Page FrontMatter should be string.${
            filePathRelative ? `\nFound in ${filePathRelative}` : ""
          }`
        );

        delete frontmatter[key];
      }
    });

    // check boolean values
    [
      "home",
      "navbar",
      "toc",
      "index",
      "lastUpdated",
      "contributors",
      "editLink",
      "breadcrumb",
      "breadcrumbIcon",
      "pageview",
      "article",
    ].forEach((key) => {
      if (key in frontmatter && typeof frontmatter[key] !== "boolean") {
        logger.warn(
          `"${key}" property in Page FrontMatter should be boolean.${
            filePathRelative ? `\nFound in ${filePathRelative}` : ""
          }`
        );

        delete frontmatter[key];
      }
    });
  }
};
