import type { Page } from "@vuepress/core";
import { colors } from "@vuepress/utils";
import { isArray, isString } from "vuepress-shared/node";

import type {
  ThemeBlogHomePageFrontmatter,
  ThemeNormalPageFrontmatter,
  ThemeProjectHomePageFrontmatter,
} from "../../shared/index.js";
import { logger } from "../utils.js";

/** @private */
export const checkFrontmatter = (page: Page): void => {
  const frontmatter = page.frontmatter as
    | ThemeProjectHomePageFrontmatter
    | ThemeBlogHomePageFrontmatter
    | ThemeNormalPageFrontmatter;

  const { filePathRelative } = page;

  ["category", "tag"].forEach((key) => {
    if (
      key in frontmatter &&
      !(
        isString(frontmatter[key]) ||
        (isArray(frontmatter[key]) &&
          (<unknown[]>frontmatter[key]).every(isString))
      )
    ) {
      logger.warn(
        `${colors.magenta(
          key,
        )} property in Page FrontMatter should be ${colors.cyan(
          "string",
        )} or ${colors.cyan(" string[]")}${
          filePathRelative ? `, found in ${filePathRelative}` : ""
        }.`,
      );

      delete frontmatter[key];
    }
  });

  // check date
  if ("date" in frontmatter && !(frontmatter.date instanceof Date)) {
    logger.warn(
      `${colors.magenta("date")} in frontMatter should be ${colors.cyan(
        "a valid Date",
      )}${filePathRelative ? `, found in ${filePathRelative}` : ""}.`,
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
      `${colors.magenta("sidebar")} in frontMatter should be ${colors.cyan(
        "heading",
      )} or ${colors.cyan("boolean")}${
        filePathRelative ? `, found in ${filePathRelative}` : ""
      }.`,
    );

    delete frontmatter.sidebar;
  }

  // check string values
  ["title", "shortTitle", "containerClass"].forEach((key) => {
    if (key in frontmatter && !isString(frontmatter[key])) {
      logger.warn(
        `${colors.magenta(key)} in frontMatter should be ${colors.cyan(
          "string",
        )}${filePathRelative ? `, found in ${filePathRelative}` : ""}.`,
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
        `${colors.magenta(key)} in frontMatter should be ${colors.cyan(
          "boolean",
        )}${filePathRelative ? `, found in ${filePathRelative}` : ""}.`,
      );

      delete frontmatter[key];
    }
  });
};
