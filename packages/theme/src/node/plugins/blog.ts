import { blogPlugin } from "vuepress-plugin-blog2";

import type { Page, Plugin } from "@vuepress/core";
import type { GitData } from "@vuepress/plugin-git";
import type { BlogOptions } from "vuepress-plugin-blog2";
import type {
  ArticleInfo,
  HopeThemeNormalPageFrontmatter,
  HopeThemeBlogLocaleData,
  HopeThemeBlogPluginOptions,
  HopeThemeConfig,
} from "../../shared";

const defaultOptions: HopeThemeBlogPluginOptions = {
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
    HopeThemeNormalPageFrontmatter,
    { routeMeta: ArticleInfo }
  >,
  pageB: Page<
    { git: GitData },
    HopeThemeNormalPageFrontmatter,
    { routeMeta: ArticleInfo }
  >
): number => {
  const prevKey = pageA.frontmatter.sticky;
  const nextKey = pageB.frontmatter.sticky;

  if (prevKey && nextKey && prevKey !== nextKey)
    return Number(nextKey) - Number(prevKey);
  if (prevKey && !nextKey) return -1;
  if (!prevKey && nextKey) return 1;

  return compareDate(pageA.routeMeta.date, pageB.routeMeta.date);
};

export const getBlogOptions = (
  options?: HopeThemeBlogPluginOptions | boolean
): HopeThemeBlogPluginOptions => ({
  ...defaultOptions,
  ...(typeof options === "object" ? options : {}),
});

export const getTitleLocales = (
  themeData: HopeThemeConfig,
  key: keyof HopeThemeBlogLocaleData
): Record<string, string> =>
  Object.fromEntries(
    Object.entries(themeData.locales).map(([localePath, value]) => [
      localePath,
      value.blogLocales[key],
    ])
  );

export const getBlogPlugin = (
  themeData: HopeThemeConfig,
  options?: HopeThemeBlogPluginOptions | boolean
): Plugin | null => {
  if (!options) return null;

  const blogOptions = {
    ...defaultOptions,
    ...(typeof options === "object" ? options : {}),
  };

  return blogPlugin({
    metaScope: "",

    filter:
      blogOptions.filter ||
      (({ frontmatter, filePathRelative, routeMeta }): boolean =>
        Boolean(filePathRelative) &&
        frontmatter["home"] !== true &&
        routeMeta["type"] !== "page"),

    category: [
      {
        key: "category",
        getter: ({
          routeMeta,
        }: Page<
          { git: GitData },
          HopeThemeNormalPageFrontmatter,
          { routeMeta: ArticleInfo }
        >) => routeMeta.category || [],
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
          HopeThemeNormalPageFrontmatter,
          { routeMeta: ArticleInfo }
        >) => routeMeta.tag || [],
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
          HopeThemeNormalPageFrontmatter,
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
          HopeThemeNormalPageFrontmatter,
          { routeMeta: ArticleInfo }
        >) => Boolean(routeMeta.isEncrypted),
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
          HopeThemeNormalPageFrontmatter,
          { routeMeta: ArticleInfo }
        >) => routeMeta.type === "slide",
        path: blogOptions.slide,
        layout: "Blog",
        frontmatter: (localePath) => ({
          title: themeData.locales[localePath].blogLocales.slides,
        }),
      },
      {
        key: "star",
        sorter,
        filter: ({
          frontmatter,
        }: Page<
          { git: GitData },
          HopeThemeNormalPageFrontmatter,
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
            HopeThemeNormalPageFrontmatter,
            { routeMeta: ArticleInfo }
          >,
          pageB: Page<
            { git: GitData },
            HopeThemeNormalPageFrontmatter,
            { routeMeta: ArticleInfo }
          >
        ) => compareDate(pageA.routeMeta.date, pageB.routeMeta.date),
        filter: ({
          frontmatter,
          routeMeta,
        }: Page<
          { git: GitData },
          HopeThemeNormalPageFrontmatter,
          { routeMeta: ArticleInfo }
        >) => "date" in routeMeta && frontmatter["timeline"] !== false,
        path: blogOptions.timeline,
        layout: "Blog",
        frontmatter: (localePath) => ({
          title: themeData.locales[localePath].blogLocales.timeline,
        }),
      },
    ],
  } as BlogOptions);
};
