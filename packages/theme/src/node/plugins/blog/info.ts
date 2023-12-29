import type { Page } from "@vuepress/core";
import { getDateInfo, timeTransformer } from "vuepress-shared/node";

import type {
  ThemeBlogHomePageFrontmatter,
  ThemeNormalPageFrontmatter,
  ThemePageData,
  ThemeProjectHomePageFrontmatter,
} from "../../../shared/index.js";
import { ArticleInfoType } from "../../../shared/index.js";

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

  // resolve author
  if ("author" in frontmatter)
    info[ArticleInfoType.author] = frontmatter.author;

  // resolve date
  if ("date" in frontmatter) {
    const date = getDateInfo(page.frontmatter.date)?.value;

    if (date) {
      info[ArticleInfoType.date] = date.getTime();

      info[ArticleInfoType.localizedDate] = timeTransformer(date, {
        lang: page.lang,
        type: "date",
      });
    }
  } else if (createdTime) {
    info[ArticleInfoType.date] = createdTime;
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
  // fallback to user-defined description
  else if (frontmatter.description && !page.data.autoDesc)
    info[ArticleInfoType.excerpt] = frontmatter.description;
};
