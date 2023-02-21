import { type Page } from "@vuepress/core";
import { getDate, timeTransformer } from "vuepress-shared/node";

import {
  ArticleInfoType,
  type ThemeBlogHomePageFrontmatter,
  type ThemeNormalPageFrontmatter,
  type ThemePageData,
  type ThemeProjectHomePageFrontmatter,
} from "../../../shared/index.js";

/** @private */
export const injectBlogBasicInfo = (
  page: Page<ThemePageData>,
  info: Record<string, unknown>
): void => {
  const frontmatter = page.frontmatter as
    | ThemeProjectHomePageFrontmatter
    | ThemeBlogHomePageFrontmatter
    | ThemeNormalPageFrontmatter;
  const { createdTime } = page.data.git || {};

  // resolve author
  if ("author" in frontmatter)
    info[ArticleInfoType.author] = frontmatter.author;

  // resolve date
  if ("date" in frontmatter) {
    const date = getDate(page.frontmatter.date)?.value;

    if (date) {
      info[ArticleInfoType.date] = frontmatter.date;

      info[ArticleInfoType.localizedDate] = timeTransformer(date, {
        lang: page.lang,
        type: "date",
      });
    }
  } else if (createdTime) {
    info[ArticleInfoType.date] = new Date(createdTime);
  }

  // resolve category
  if ("category" in frontmatter)
    info[ArticleInfoType.category] = frontmatter.category;

  // resolve tag
  if ("tag" in frontmatter) info[ArticleInfoType.tag] = frontmatter.tag;

  // resolve sticky
  if ("sticky" in frontmatter)
    info[ArticleInfoType.sticky] = frontmatter.sticky;

  // resolve image
  if ("cover" in frontmatter) info[ArticleInfoType.cover] = frontmatter.cover;

  // resolve isOriginal
  if ("isOriginal" in frontmatter)
    info[ArticleInfoType.isOriginal] = frontmatter.isOriginal;

  // save page excerpt to routeMeta
  if (frontmatter.excerpt) info[ArticleInfoType.excerpt] = frontmatter.excerpt;
  else if (page.data.excerpt) info[ArticleInfoType.excerpt] = page.data.excerpt;
  else if (frontmatter.description)
    info[ArticleInfoType.excerpt] = frontmatter.description;
};
