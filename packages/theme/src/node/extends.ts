import { getCategory, getTag } from "@mr-hope/vuepress-shared";
import { logger } from "@vuepress/utils";

import type { App, Page } from "@vuepress/core";
import type {
  HopeThemeConfig,
  HopeThemePageData,
  HopeThemeBlogHomePageFrontmatter,
  HopeThemeProjectHomePageFrontmatter,
  HopeThemeNormalPageFrontmatter,
} from "../shared";

export const extendsPage = (
  app: App,
  themeConfig: HopeThemeConfig,
  page: Page<HopeThemePageData>
): void => {
  const { config = {} } = themeConfig.encrypt;
  const frontmatter = page.frontmatter as
    | HopeThemeProjectHomePageFrontmatter
    | HopeThemeBlogHomePageFrontmatter
    | HopeThemeNormalPageFrontmatter;
  const { filePathRelative, path } = page;
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

  // resolve category
  if ("category" in frontmatter) {
    const category = getCategory(frontmatter.category);

    frontmatter.category = category;
    page.routeMeta.category = category;
  }

  // resolve tag
  if ("tag" in frontmatter) {
    const tag = getTag(frontmatter.tag);

    frontmatter.tag = tag;
    page.routeMeta.tag = tag;
  }

  // save relative file path into page data to generate edit link
  page.data.filePathRelative = filePathRelative;

  if (frontmatter.home)
    page.routeMeta = {
      ...page.routeMeta,
      type: "home",
      icon: frontmatter.icon,
      title: page.title,
    };
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
      readingTime: page.data.readingTime,
      excerpt: page.excerpt,
      sticky: frontmatter.sticky,
      star: frontmatter.star,
      image: frontmatter.cover,
      isOriginal: frontmatter.isOriginal,
    };

    // resolve encrypted
    if (Object.keys(config).some((key) => path.startsWith(key)))
      page.routeMeta.isEncrypted = true;
  }
};
