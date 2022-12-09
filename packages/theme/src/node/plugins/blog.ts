import { blogPlugin } from "vuepress-plugin-blog2";
import { getDate, timeTransformer } from "vuepress-shared/node";
import { checkFrontmatter } from "../frontmatter/check.js";
import { ArticleInfoType, PageType } from "../../shared/index.js";

import type { App, Page, Plugin } from "@vuepress/core";
import type { GitData } from "@vuepress/plugin-git";
import type { BlogOptions } from "vuepress-plugin-blog2";
import type {
  ArticleInfo,
  BlogPluginOptions,
  ThemeData,
  ThemePageData,
  ThemeBlogHomePageFrontmatter,
  ThemeProjectHomePageFrontmatter,
  ThemeNormalPageFrontmatter,
} from "../../shared/index.js";

const defaultOptions: BlogPluginOptions = {
  article: "/article/",
  category: "/category/",
  categoryItem: "/category/:name/",
  tag: "/tag/",
  tagItem: "/tag/:name/",
  encrypted: "/encrypted/",
  slide: "/slide/",
  star: "/star/",
  timeline: "/timeline/",
};

const compareDate = (
  dateA: Date | undefined,
  dateB: Date | undefined
): number => {
  if (!dateA) return 1;
  if (!dateB) return -1;

  return dateB.getTime() - dateA.getTime();
};

const sorter = (
  pageA: Page<
    { git: GitData },
    ThemeNormalPageFrontmatter,
    { routeMeta: ArticleInfo }
  >,
  pageB: Page<
    { git: GitData },
    ThemeNormalPageFrontmatter,
    { routeMeta: ArticleInfo }
  >
): number => {
  const prevKey = pageA.frontmatter.sticky;
  const nextKey = pageB.frontmatter.sticky;

  if (prevKey && nextKey && prevKey !== nextKey)
    return Number(nextKey) - Number(prevKey);
  if (prevKey && !nextKey) return -1;
  if (!prevKey && nextKey) return 1;

  return compareDate(
    pageA.routeMeta[ArticleInfoType.date],
    pageB.routeMeta[ArticleInfoType.date]
  );
};

export const getBlogOptions = (
  options?: BlogPluginOptions | boolean
): BlogPluginOptions => ({
  ...defaultOptions,
  ...(typeof options === "object" ? options : {}),
});

export const getBlogPlugin = (
  app: App,
  themeData: ThemeData,
  options?: BlogPluginOptions | boolean,
  hotReload = false
): Plugin | null => {
  if (!options) return null;

  const blogOptions = {
    ...defaultOptions,
    ...(typeof options === "object" ? options : {}),
  };
  const encryptedPaths = Object.keys(themeData.encrypt.config || {});

  return blogPlugin(<BlogOptions>{
    metaScope: "",

    filter:
      blogOptions.filter ||
      (({ frontmatter, filePathRelative }: Page<ThemePageData>): boolean => {
        const pageFrontmatter = frontmatter as
          | ThemeProjectHomePageFrontmatter
          | ThemeBlogHomePageFrontmatter
          | ThemeNormalPageFrontmatter;

        const isArticle =
          // declaring this is an article
          pageFrontmatter.article ||
          // generated from markdown files
          Boolean(pageFrontmatter.article !== false && filePathRelative);

        const isSlide = isArticle && frontmatter.layout === "Slide";

        return isArticle || isSlide;
      }),

    getInfo: (page: Page<ThemePageData>) => {
      const info: Record<string, unknown> = {};
      const frontmatter = page.frontmatter as
        | ThemeProjectHomePageFrontmatter
        | ThemeBlogHomePageFrontmatter
        | ThemeNormalPageFrontmatter;
      const { filePathRelative, path } = page;
      const { createdTime } = page.data.git || {};

      const isArticle =
        // declaring this is an article
        frontmatter.article ||
        // generated from markdown files
        Boolean(frontmatter.article !== false && filePathRelative);
      const isEncrypted = encryptedPaths.some((key) =>
        decodeURI(path).startsWith(key)
      );
      const isSlide = isArticle && frontmatter.layout === "Slide";

      checkFrontmatter(page, app.env.isDebug);

      // save page type to routeMeta
      info[ArticleInfoType.type] = frontmatter.home
        ? PageType.home
        : isSlide
        ? PageType.slide
        : isArticle
        ? PageType.article
        : PageType.page;

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
      } else if (createdTime)
        info[ArticleInfoType.date] = new Date(createdTime);

      // resolve category
      if ("category" in frontmatter)
        info[ArticleInfoType.category] = frontmatter.category;

      // resolve tag
      if ("tag" in frontmatter) info[ArticleInfoType.tag] = frontmatter.tag;

      // resolve sticky
      if ("sticky" in frontmatter)
        info[ArticleInfoType.sticky] = frontmatter.sticky;

      // resolve image
      if ("cover" in frontmatter)
        info[ArticleInfoType.cover] = frontmatter.cover;

      // resolve isOriginal
      if ("isOriginal" in frontmatter)
        info[ArticleInfoType.isOriginal] = frontmatter.isOriginal;

      // resolve encrypted
      if (isEncrypted) info[ArticleInfoType.isEncrypted] = true;

      // save page excerpt to routeMeta
      if (page.data.excerpt) info[ArticleInfoType.excerpt] = page.data.excerpt;

      if (
        // reading time data is sensitive with markdown contents
        (hotReload || app.env.isBuild) &&
        // ensure a valid reading time exists
        page.data.readingTime &&
        page.data.readingTime.words !== 0
      )
        info[ArticleInfoType.readingTime] = page.data.readingTime;

      return info;
    },

    category: [
      {
        key: "category",
        getter: ({
          routeMeta,
        }: Page<
          { git: GitData },
          ThemeNormalPageFrontmatter,
          { routeMeta: ArticleInfo }
        >) => routeMeta[ArticleInfoType.category] || [],
        sorter,
        path: blogOptions.category,
        layout: "Blog",
        frontmatter: (localePath) => ({
          title: themeData.locales[localePath].blogLocales.category,
        }),
        itemPath: blogOptions.categoryItem,
        itemFrontmatter: (name, localePath) => ({
          title: `${name} ${themeData.locales[localePath].blogLocales.category}`,
        }),
        itemLayout: "Blog",
      },
      {
        key: "tag",
        getter: ({
          routeMeta,
        }: Page<
          { git: GitData },
          ThemeNormalPageFrontmatter,
          { routeMeta: ArticleInfo }
        >) => routeMeta[ArticleInfoType.tag] || [],
        sorter,
        path: blogOptions.tag,
        layout: "Blog",
        frontmatter: (localePath) => ({
          title: themeData.locales[localePath].blogLocales.tag,
        }),
        itemPath: blogOptions.tagItem,
        itemLayout: "Blog",
        itemFrontmatter: (name, localePath) => ({
          title: `${name} ${themeData.locales[localePath].blogLocales.tag}`,
        }),
      },
    ],

    type: [
      {
        key: "article",
        sorter,
        filter: ({
          frontmatter,
        }: Page<
          { git: GitData },
          ThemeNormalPageFrontmatter,
          { routeMeta: ArticleInfo }
        >) => frontmatter.article !== false,
        path: blogOptions.article,
        layout: "Blog",
        frontmatter: (localePath) => ({
          title: themeData.locales[localePath].blogLocales.article,
        }),
      },
      {
        key: "encrypted",
        sorter,
        filter: ({
          routeMeta,
        }: Page<
          { git: GitData },
          ThemeNormalPageFrontmatter,
          { routeMeta: ArticleInfo }
        >) => Boolean(routeMeta[ArticleInfoType.isEncrypted]),
        path: blogOptions.encrypted,
        layout: "Blog",
        frontmatter: (localePath) => ({
          title: themeData.locales[localePath].blogLocales.encrypt,
        }),
      },
      {
        key: "slide",
        sorter,
        filter: ({
          routeMeta,
        }: Page<
          { git: GitData },
          ThemeNormalPageFrontmatter,
          { routeMeta: ArticleInfo }
        >) => routeMeta[ArticleInfoType.type] === PageType.slide,
        path: blogOptions.slide,
        layout: "Blog",
        frontmatter: (localePath) => ({
          title: themeData.locales[localePath].blogLocales.slides,
        }),
      },
      {
        key: "star",
        sorter: (
          pageA: Page<
            { git: GitData },
            ThemeNormalPageFrontmatter,
            { routeMeta: ArticleInfo }
          >,
          pageB: Page<
            { git: GitData },
            ThemeNormalPageFrontmatter,
            { routeMeta: ArticleInfo }
          >
        ): number => {
          const prevKey = pageA.frontmatter.star;
          const nextKey = pageB.frontmatter.star;

          if (prevKey && nextKey && prevKey !== nextKey)
            return Number(nextKey) - Number(prevKey);
          if (prevKey && !nextKey) return -1;
          if (!prevKey && nextKey) return 1;

          return compareDate(
            pageA.routeMeta[ArticleInfoType.date],
            pageB.routeMeta[ArticleInfoType.date]
          );
        },
        filter: ({
          frontmatter,
        }: Page<
          { git: GitData },
          ThemeNormalPageFrontmatter,
          { routeMeta: ArticleInfo }
        >) => Boolean(frontmatter.star),
        path: blogOptions.star,
        layout: "Blog",
        frontmatter: (localePath) => ({
          title: themeData.locales[localePath].blogLocales.star,
        }),
      },
      {
        key: "timeline",
        sorter: (
          pageA: Page<
            { git: GitData },
            ThemeNormalPageFrontmatter,
            { routeMeta: ArticleInfo }
          >,
          pageB: Page<
            { git: GitData },
            ThemeNormalPageFrontmatter,
            { routeMeta: ArticleInfo }
          >
        ) =>
          compareDate(
            pageA.routeMeta[ArticleInfoType.date],
            pageB.routeMeta[ArticleInfoType.date]
          ),
        filter: ({
          frontmatter,
          routeMeta,
        }: Page<
          { git: GitData },
          ThemeNormalPageFrontmatter,
          { routeMeta: ArticleInfo }
        >) =>
          ArticleInfoType.date in routeMeta &&
          frontmatter["timeline"] !== false,
        path: blogOptions.timeline,
        layout: "Blog",
        frontmatter: (localePath) => ({
          title: themeData.locales[localePath].blogLocales.timeline,
        }),
      },
    ],

    excerpt: true,

    excerptFilter: ({
      data,
      frontmatter,
      path,
    }: Page<{ autoDesc?: boolean }>) => {
      const isPageEncrypted = encryptedPaths.some((key) =>
        decodeURI(path).startsWith(key)
      );

      return (
        !isPageEncrypted &&
        !("excerpt" in frontmatter) &&
        (data.autoDesc || !("description" in frontmatter))
      );
    },

    hotReload,
    ...("hotReload" in blogOptions ? { hotReload: blogOptions.hotReload } : {}),
  });
};
