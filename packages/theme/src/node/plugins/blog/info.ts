import { getDate } from "@vuepress/helper";
import type { Page } from "vuepress/core";
import { timeTransformer } from "vuepress-shared/node";

import type {
  ThemeBlogHomePageFrontmatter,
  ThemeNormalPageFrontmatter,
  ThemePageData,
  ThemeProjectHomePageFrontmatter,
} from "../../../shared/index.js";
import { ArticleInfo, PageType } from "../../../shared/index.js";

/** @private */
export const injectBlogBasicInfo = (
  page: Page<ThemePageData>,
  info: Record<string, unknown>,
): void => {
  const frontmatter = page.frontmatter as
    | ThemeProjectHomePageFrontmatter
    | ThemeBlogHomePageFrontmatter
    | ThemeNormalPageFrontmatter;
  const { createdTime } = page.data.git || {};

  const isArticle =
    // Declaring this is an article
    frontmatter.article ||
    // Generated from markdown files
    Boolean(frontmatter.article !== false && page.filePathRelative);
  const isSlide = frontmatter.layout === "Slide";

  // Save page type to routeMeta
  page.routeMeta[ArticleInfo.type] = frontmatter.home
    ? PageType.home
    : isSlide
      ? PageType.slide
      : isArticle
        ? PageType.article
        : PageType.page;

  // Resolve author
  if ("author" in frontmatter) info[ArticleInfo.author] = frontmatter.author;

  // Resolve date
  if ("date" in frontmatter) {
    const date = getDate(page.frontmatter.date);

    if (date) {
      info[ArticleInfo.date] = date.getTime();

      info[ArticleInfo.localizedDate] = timeTransformer(date, {
        lang: page.lang,
        type: "date",
      });
    }
  } else if (createdTime) {
    info[ArticleInfo.date] = createdTime;
  }

  // Resolve category
  if ("category" in frontmatter)
    info[ArticleInfo.category] = frontmatter.category;
  else if ("categories" in frontmatter)
    info[ArticleInfo.category] = frontmatter.categories;

  // Resolve tag
  if ("tag" in frontmatter) info[ArticleInfo.tag] = frontmatter.tag;
  else if ("tags" in frontmatter) info[ArticleInfo.tag] = frontmatter.tags;

  // Resolve sticky
  if ("sticky" in frontmatter) info[ArticleInfo.sticky] = frontmatter.sticky;

  // Resolve image
  if ("cover" in frontmatter) info[ArticleInfo.cover] = frontmatter.cover;

  // Resolve isOriginal
  if ("isOriginal" in frontmatter)
    info[ArticleInfo.isOriginal] = frontmatter.isOriginal;

  // Save page excerpt to routeMeta
  if (frontmatter.excerpt) info[ArticleInfo.excerpt] = frontmatter.excerpt;
  else if (page.data.excerpt) info[ArticleInfo.excerpt] = page.data.excerpt;
  // Fallback to user-defined description
  else if (frontmatter.description && !page.data.autoDesc)
    info[ArticleInfo.excerpt] = frontmatter.description;
};
