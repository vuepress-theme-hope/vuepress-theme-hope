import { getDate } from "@vuepress/helper";
import type { Page } from "vuepress/core";
import { timeTransformer } from "vuepress-shared/node";

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

  // Resolve author
  if ("author" in frontmatter)
    info[ArticleInfoType.author] = frontmatter.author;

  // Resolve date
  if ("date" in frontmatter) {
    const date = getDate(page.frontmatter.date);

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

  // Resolve category
  if ("category" in frontmatter)
    info[ArticleInfoType.category] = frontmatter.category;
  else if ("categories" in frontmatter)
    info[ArticleInfoType.category] = frontmatter.categories;

  // Resolve tag
  if ("tag" in frontmatter) info[ArticleInfoType.tag] = frontmatter.tag;
  else if ("tags" in frontmatter) info[ArticleInfoType.tag] = frontmatter.tags;

  // Resolve sticky
  if ("sticky" in frontmatter)
    info[ArticleInfoType.sticky] = frontmatter.sticky;

  // Resolve image
  if ("cover" in frontmatter) info[ArticleInfoType.cover] = frontmatter.cover;

  // Resolve isOriginal
  if ("isOriginal" in frontmatter)
    info[ArticleInfoType.isOriginal] = frontmatter.isOriginal;

  // Save page excerpt to routeMeta
  if (frontmatter.excerpt) info[ArticleInfoType.excerpt] = frontmatter.excerpt;
  else if (page.data.excerpt) info[ArticleInfoType.excerpt] = page.data.excerpt;
  // Fallback to user-defined description
  else if (frontmatter.description && !page.data.autoDesc)
    info[ArticleInfoType.excerpt] = frontmatter.description;
};
