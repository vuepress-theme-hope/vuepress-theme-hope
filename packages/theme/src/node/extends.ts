import { getCategory, getDate, getTag } from "@mr-hope/vuepress-shared";
import type { App, Page } from "@vuepress/core";
import { logger } from "@vuepress/utils";
import type { HopeThemePageData, HopeThemePageFrontmatter } from "../shared";

export const extendsPage = (app: App, page: Page<HopeThemePageData>): void => {
  const frontmatter = page.frontmatter as HopeThemePageFrontmatter;
  const { filePathRelative } = page;
  const { createdTime } = page.data.git;

  // handle deprecated
  const handleDeprecated = (deprecatedKey: string, key = ""): void => {
    if (deprecatedKey in frontmatter) {
      // show logger in dev mode
      if (app.env.isDev)
        logger.warn(
          `'${deprecatedKey}' property in Page FrontMatter is deprecated${
            key ? `, please use ${key} instead` : ""
          }.${filePathRelative ? `\nFound in ${filePathRelative}` : ""}`
        );

      if (!(key in frontmatter)) {
        frontmatter[key] = frontmatter[deprecatedKey];
      }

      delete frontmatter[deprecatedKey];
    }
  };

  handleDeprecated("authors", "author");
  handleDeprecated("tags", "tag");
  handleDeprecated("categories", "category");
  handleDeprecated("time", "date");

  // save relative file path into page data to generate edit link
  page.data.filePathRelative = filePathRelative;
  // save basic info to routeMeta
  page.routeMeta = {
    ...page.routeMeta,
    title: page.title,
    icon: frontmatter.icon,
    author: frontmatter.author,
    date: getDate(
      frontmatter.date || (createdTime ? new Date(createdTime) : undefined)
    ),
    category: getCategory(frontmatter.category),
    tag: getTag(frontmatter.tag),
  };
};
