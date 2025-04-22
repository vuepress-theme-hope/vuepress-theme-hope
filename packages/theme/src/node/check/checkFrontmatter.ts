import { isArray, isString } from "@vuepress/helper";
import type { Page } from "vuepress/core";
import { colors } from "vuepress/utils";

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
          (frontmatter[key] as unknown[]).every(isString))
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

  // Check date
  if ("date" in frontmatter && !(frontmatter.date instanceof Date)) {
    logger.warn(
      `${colors.magenta("date")} in frontMatter should be ${colors.cyan(
        "a valid Date",
      )}${filePathRelative ? `, found in ${filePathRelative}` : ""}.`,
    );

    delete frontmatter.date;
  }

  // Check sidebar
  if ("sidebar" in frontmatter && typeof frontmatter.sidebar !== "boolean") {
    logger.warn(
      `${colors.magenta("sidebar")} in frontMatter should be ${colors.cyan("boolean")}${
        filePathRelative ? `, found in ${filePathRelative}` : ""
      }.`,
    );

    delete frontmatter.sidebar;
  }

  // Check string values
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

  // Check boolean values
  [
    "home",
    "navbar",
    "index",
    "lastUpdated",
    "editLink",
    "breadcrumb",
    "breadcrumbIcon",
    "breadcrumbExclude",
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

  // check dot values
  Object.keys(frontmatter).forEach((key) => {
    if (key.includes("."))
      logger.warn(
        `${colors.magenta(key)} in frontMatter should not contain ${colors.cyan(
          ".",
        )}${filePathRelative ? `, found in ${filePathRelative}` : ""}.`,
      );
  });
};
