import { logger } from "@vuepress/utils";
import {
  getCategory,
  getDate,
  getTag,
  injectLocalizedDate,
  timeTransformer,
} from "vuepress-shared";

import {
  AUTHOR,
  CATEGORY,
  COVER,
  DATE,
  EXCERPT,
  ICON,
  IS_ENCRYPTED,
  IS_ORIGINAL,
  LOCALIZED_DATE,
  PageType,
  READING_TIME,
  SHORT_TITLE,
  STICKY,
  TAG,
  TITLE,
  TYPE,
} from "../shared/index.js";

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
        `"date" roperty in Page FrontMatter should be a valid Date.${
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

  page.routeMeta[TITLE] = page.title;

  if ("icon" in frontmatter) page.routeMeta[ICON] = frontmatter.icon;

  // resolve shortTitle
  if ("shortTitle" in frontmatter)
    page.routeMeta[SHORT_TITLE] = frontmatter.shortTitle;

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
    page.routeMeta[TYPE] = frontmatter.home
      ? PageType.Home
      : isSlide
      ? PageType.Slide
      : isArticle
      ? PageType.Article
      : PageType.Page;

    const excerpt = isEncrypted
      ? ""
      : page.excerpt ||
        frontmatter.description ||
        (typeof plugins.blog === "object" && plugins.blog.autoExcerpt
          ? frontmatter.summary || ""
          : "");

    // save page excerpt to routeMeta
    if (excerpt) page.routeMeta[EXCERPT] = excerpt;

    // resolve author
    if ("author" in frontmatter) page.routeMeta[AUTHOR] = frontmatter.author;

    // resolve date
    if ("date" in frontmatter) {
      const date = getDate(page.frontmatter.date)?.value;

      if (date) {
        page.routeMeta[DATE] = frontmatter.date;

        page.routeMeta[LOCALIZED_DATE] = timeTransformer(date, {
          lang: page.lang,
          type: "date",
        });
      }
    } else if (createdTime) page.routeMeta[DATE] = new Date(createdTime);

    if ("category" in frontmatter)
      // resolve category
      // resolve category
      page.routeMeta[CATEGORY] = frontmatter.category;

    // resolve tag
    if ("tag" in frontmatter) page.routeMeta[TAG] = frontmatter.tag;

    // resolve sticky
    if ("sticky" in frontmatter) page.routeMeta[STICKY] = frontmatter.sticky;

    // resolve image
    if ("cover" in frontmatter) page.routeMeta[COVER] = frontmatter.cover;

    // ensure a valid reading time exisits
    if (page.data.readingTime && page.data.readingTime.words !== 0)
      page.routeMeta[READING_TIME] = page.data.readingTime;

    // resolve isOriginal
    if ("isOriginal" in frontmatter)
      page.routeMeta[IS_ORIGINAL] = frontmatter.isOriginal;

    // resolve encrypted
    if (isEncrypted) page.routeMeta[IS_ENCRYPTED] = true;
  }
};
