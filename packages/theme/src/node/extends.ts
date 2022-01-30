import { getCategory, getTag } from "@mr-hope/vuepress-shared";
import { logger } from "@vuepress/utils";

import type { App, Page } from "@vuepress/core";
import type {
  HopeThemePageData,
  HopeThemeBlogHomePageFrontmatter,
  HopeThemeProjectHomePageFrontmatter,
  HopeThemeNormalPageFrontmatter,
} from "../shared";

export const extendsPage = (app: App, page: Page<HopeThemePageData>): void => {
  const frontmatter = page.frontmatter as
    | HopeThemeProjectHomePageFrontmatter
    | HopeThemeBlogHomePageFrontmatter
    | HopeThemeNormalPageFrontmatter;
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

  // check date
  if ("date" in frontmatter && !(frontmatter.date instanceof Date)) {
    if (app.env.isDev)
      logger.error(
        `'date' roperty in Page FrontMatter should be a valid Date.${
          filePathRelative ? `\nFound in ${filePathRelative}` : ""
        }`
      );

    delete frontmatter.date;
  }
  // save relative file path into page data to generate edit link
  page.data.filePathRelative = filePathRelative;

  if (frontmatter.home) page.routeMeta = { type: "home", title: page.title };
  else {
    const isArticle =
      // declaring this is an article
      frontmatter.isArticle ||
      // generated from markdown files
      Boolean(frontmatter.isArticle !== false && filePathRelative);

    const isSlide = isArticle && frontmatter.layout === "Slide";

    // save basic info to routeMeta
    page.routeMeta = {
      ...page.routeMeta,
      type: isSlide ? "slide" : isArticle ? "article" : "page",
      title: page.title,
      icon: frontmatter.icon,
      author: frontmatter.author,
      date:
        frontmatter.date || (createdTime ? new Date(createdTime) : undefined),
      category: getCategory(frontmatter.category),
      tag: getTag(frontmatter.tag),
      readingTime: page.data.readingTime,
      excerpt: page.excerpt,
      sticky: frontmatter.sticky,
      star: frontmatter.star,
      image: frontmatter.cover,
    };
  }
};
