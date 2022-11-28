import matter from "gray-matter";
import {
  getDate,
  injectLocalizedDate,
  md2text,
  timeTransformer,
} from "vuepress-shared/node";

import { ArticleInfoType, PageType } from "../shared/index.js";

import type { Page } from "@vuepress/core";
import type {
  ThemeConfig,
  ThemePageData,
  PluginsOptions,
  ThemeBlogHomePageFrontmatter,
  ThemeProjectHomePageFrontmatter,
  ThemeNormalPageFrontmatter,
} from "../shared/index.js";

export const extendsPage = (
  themeConfig: ThemeConfig,
  plugins: PluginsOptions,
  page: Page<ThemePageData>,
  hotReload = false
): void => {
  console.log(page.data);
  const { config = {} } = themeConfig.encrypt;
  const frontmatter = page.frontmatter as
    | ThemeProjectHomePageFrontmatter
    | ThemeBlogHomePageFrontmatter
    | ThemeNormalPageFrontmatter;
  const { filePathRelative, path } = page;
  const { createdTime } = page.data.git || {};

  // save relative file path into page data to generate edit link
  page.data.filePathRelative = filePathRelative;

  console.log(page.data);

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
    if (page.data.readingTime && page.data.readingTime.words !== 0 && hotReload)
      page.routeMeta[ArticleInfoType.readingTime] = page.data.readingTime;

    // resolve isOriginal
    if ("isOriginal" in frontmatter)
      page.routeMeta[ArticleInfoType.isOriginal] = frontmatter.isOriginal;

    // resolve encrypted
    if (isEncrypted) page.routeMeta[ArticleInfoType.isEncrypted] = true;

    // excerpt and reading-time is sensitive with markdown contents
    // to improve hmr speed, we only ensure this with `hotReload` enabled.
    if (hotReload) {
      const excerpt = isEncrypted
        ? ""
        : frontmatter.excerpt ||
          page.excerpt ||
          // special handle auto generated description by seo2 plugin
          (page.data.autoDesc ? "" : frontmatter.description) ||
          // handle autoExcerpt option
          (typeof plugins.blog === "object" && plugins.blog.autoExcerpt
            ? page.data.autoDesc
              ? frontmatter.description
              : md2text(
                  matter(page.content)
                    .content.trim()
                    // remove first heading1 as title
                    .replace(/^# (.*)$/gm, "")
                ).slice(0, 180)
            : "");

      // save page excerpt to routeMeta
      if (excerpt) page.routeMeta[ArticleInfoType.excerpt] = excerpt;
    }
  }
};
