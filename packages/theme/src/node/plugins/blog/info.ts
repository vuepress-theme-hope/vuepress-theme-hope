import { getDate, isArray } from "@vuepress/helper";
import type { Page } from "vuepress/core";

import type {
  ArticleInfoData,
  ThemeBlogHomePageFrontmatter,
  ThemeNormalPageFrontmatter,
  ThemePageData,
  ThemeProjectHomePageFrontmatter,
} from "../../../shared/index.js";

/** @private */
export const injectBlogBasicInfo = (
  page: Page<ThemePageData>,
  info: Partial<ArticleInfoData>,
): void => {
  const frontmatter = page.frontmatter as
    | ThemeProjectHomePageFrontmatter
    | ThemeBlogHomePageFrontmatter
    | ThemeNormalPageFrontmatter;
  const { createdTime } = page.data.git ?? {};

  const isArticle =
    // Declaring this is an article
    frontmatter.article ??
    // Generated from markdown files and not homepage
    (!frontmatter.home && Boolean(page.filePathRelative));
  const isSlide = frontmatter.layout === "Slides";

  // Save page type to routeMeta
  page.routeMeta.type = frontmatter.home
    ? "home"
    : isSlide
      ? "slide"
      : isArticle
        ? "article"
        : "page";

  // Resolve author
  if (frontmatter.author) info.author = frontmatter.author;

  // Resolve date
  if (frontmatter.date) {
    const date = getDate(page.frontmatter.date);

    if (date) {
      info.date = date.getTime();
    }
  } else if (createdTime) {
    info.date = createdTime;
  }

  // Resolve category
  if (frontmatter.category)
    info.category = isArray(frontmatter.category)
      ? frontmatter.category
      : [frontmatter.category];
  else if (frontmatter.categories) info.category = frontmatter.categories;

  // Resolve tag
  if (frontmatter.tag)
    info.tag = isArray(frontmatter.tag) ? frontmatter.tag : [frontmatter.tag];
  else if (frontmatter.tags) info.tag = frontmatter.tags;

  // Resolve sticky
  if ("sticky" in frontmatter)
    info.sticky = frontmatter.sticky as number | boolean;

  // Resolve image
  if (frontmatter.cover) info.cover = frontmatter.cover;

  // Resolve isOriginal
  if (frontmatter.isOriginal) info.isOriginal = frontmatter.isOriginal;

  // Save page excerpt to routeMeta
  if (frontmatter.excerpt) info.excerpt = frontmatter.excerpt as string;
  else if (page.data.excerpt) info.excerpt = page.data.excerpt;
  // Fallback to user-defined description
  else if (frontmatter.description && !page.data.autoDesc)
    info.excerpt = frontmatter.description;
};
