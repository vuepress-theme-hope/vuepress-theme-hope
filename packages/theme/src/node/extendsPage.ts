import { logger } from "@vuepress/utils";
import {
  getCategory,
  getDate,
  getTag,
  injectLocalizedDate,
  timeTransformer,
} from "vuepress-shared/node";

import { ArticleInfoType, PageType } from "../shared/index.js";

import type { Page } from "@vuepress/core";
import type {
  HopeThemeConfig,
  HopeThemePageData,
  HopeThemePluginsOptions,
  HopeThemeBlogHomePageFrontmatter,
  HopeThemeProjectHomePageFrontmatter,
  HopeThemeNormalPageFrontmatter,
} from "../shared/index.js";

export const checkFrontmatter = (
  page: Page<HopeThemePageData>,
  isDev = false
): void => {
  const frontmatter = page.frontmatter as
    | HopeThemeProjectHomePageFrontmatter
    | HopeThemeBlogHomePageFrontmatter
    | HopeThemeNormalPageFrontmatter;

  const { filePathRelative } = page;

  // check date
  if ("date" in frontmatter && !(frontmatter.date instanceof Date)) {
    if (isDev)
      logger.error(
        `"date" property in Page FrontMatter should be a valid Date.${
          filePathRelative ? `\nFound in ${filePathRelative}` : ""
        }`
      );

    delete frontmatter.date;
  }

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
};

export const extendsPage = (
  themeConfig: HopeThemeConfig,
  plugins: HopeThemePluginsOptions,
  page: Page<HopeThemePageData>,
  isDev = false
): void => {
  const { config = {} } = themeConfig.encrypt;
  const frontmatter = page.frontmatter as
    | HopeThemeProjectHomePageFrontmatter
    | HopeThemeBlogHomePageFrontmatter
    | HopeThemeNormalPageFrontmatter;
  const { filePathRelative, path } = page;
  const { createdTime } = page.data.git || {};

  checkFrontmatter(page, isDev);

  // save relative file path into page data to generate edit link
  page.data.filePathRelative = filePathRelative;

  // inject localized date
  injectLocalizedDate(page);

  page.routeMeta[ArticleInfoType.title] = page.title;

  if ("icon" in frontmatter)
    page.routeMeta[ArticleInfoType.icon] = frontmatter.icon;

  // resolve shortTitle
  if ("shortTitle" in frontmatter)
    page.routeMeta[ArticleInfoType.shortTitle] = frontmatter.shortTitle;

  if (plugins.blog) {
    const isArticle =
      // declaring this is an article
      frontmatter.article ||
      // generated from markdown files
      Boolean(frontmatter.article !== false && filePathRelative);
    const isEncrypted = Object.keys(config).some((key) =>
      decodeURI(path).startsWith(key)
    );
    const isSlide = isArticle && frontmatter.layout === "Slide";

    // save page type to routeMeta
    page.routeMeta[ArticleInfoType.type] = frontmatter.home
      ? PageType.home
      : isSlide
      ? PageType.slide
      : isArticle
      ? PageType.article
      : PageType.page;

    const excerpt = isEncrypted
      ? ""
      : page.excerpt ||
        frontmatter.description ||
        (typeof plugins.blog === "object" && plugins.blog.autoExcerpt
          ? frontmatter.summary || ""
          : "");

    // save page excerpt to routeMeta
    if (excerpt) page.routeMeta[ArticleInfoType.excerpt] = excerpt;

    // resolve author
    if ("author" in frontmatter)
      page.routeMeta[ArticleInfoType.author] = frontmatter.author;

    // resolve date
    if ("date" in frontmatter) {
      const date = getDate(page.frontmatter.date)?.value;

      if (date) {
        page.routeMeta[ArticleInfoType.date] = frontmatter.date;

        page.routeMeta[ArticleInfoType.localizedDate] = timeTransformer(date, {
          lang: page.lang,
          type: "date",
        });
      }
    } else if (createdTime)
      page.routeMeta[ArticleInfoType.date] = new Date(createdTime);

    if ("category" in frontmatter)
      // resolve category
      // resolve category
      page.routeMeta[ArticleInfoType.category] = frontmatter.category;

    // resolve tag
    if ("tag" in frontmatter)
      page.routeMeta[ArticleInfoType.tag] = frontmatter.tag;

    // resolve sticky
    if ("sticky" in frontmatter)
      page.routeMeta[ArticleInfoType.sticky] = frontmatter.sticky;

    // resolve image
    if ("cover" in frontmatter)
      page.routeMeta[ArticleInfoType.cover] = frontmatter.cover;

    // ensure a valid reading time exists
    if (page.data.readingTime && page.data.readingTime.words !== 0)
      page.routeMeta[ArticleInfoType.readingTime] = page.data.readingTime;

    // resolve isOriginal
    if ("isOriginal" in frontmatter)
      page.routeMeta[ArticleInfoType.isOriginal] = frontmatter.isOriginal;

    // resolve encrypted
    if (isEncrypted) page.routeMeta[ArticleInfoType.isEncrypted] = true;
  }
};
