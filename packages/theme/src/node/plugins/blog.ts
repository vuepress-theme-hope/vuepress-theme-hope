import type { Page } from "@vuepress/core";
import type { BlogOptions } from "vuepress-plugin-blog2";
import type { HopeThemeBlogPluginOptions } from "../../shared";

const defaultOptions: HopeThemeBlogPluginOptions = {
  article: "/article/",
  category: "/category/",
  categoryItem: "/category/:name/",
  tag: "/tag/",
  tagItem: "/tag/:name/",
  encrypted: "/encrypted/",
  slides: "/slides/",
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

const sorter = (pageA: Page, pageB: Page): number => {
  const prevKey = pageA.frontmatter.sticky;
  const nextKey = pageB.frontmatter.sticky;

  if (prevKey && nextKey && prevKey !== nextKey)
    return Number(nextKey) - Number(prevKey);
  if (prevKey && !nextKey) return -1;
  if (!prevKey && nextKey) return 1;

  return compareDate(
    pageA.routeMeta.date as Date | undefined,
    pageB.routeMeta.date as Date | undefined
  );
};

export const getBlogOptions = (
  options?: HopeThemeBlogPluginOptions | boolean
): HopeThemeBlogPluginOptions => ({
  ...defaultOptions,
  ...(typeof options === "object" ? options : {}),
});

export const resolveBlogOptions = (
  options?: HopeThemeBlogPluginOptions | boolean
): BlogOptions | false => {
  if (!options) return false;

  const blogOptions = {
    ...defaultOptions,
    ...(typeof options === "object" ? options : {}),
  };

  return {
    metaScope: "",

    filter:
      blogOptions.filter ||
      (({ frontmatter, filePathRelative, routeMeta }): boolean =>
        Boolean(filePathRelative) &&
        frontmatter.home !== true &&
        routeMeta.type !== "page"),

    category: [
      {
        key: "category",
        getter: ({ routeMeta }) => (routeMeta.category as string[]) || [],
        sorter,
        path: blogOptions.category,
        layout: "Blog",
        itemPath: blogOptions.categoryItem,
        itemLayout: "Blog",
      },
      {
        key: "tag",
        getter: ({ routeMeta }) => (routeMeta.tag as string[]) || [],
        sorter,
        path: blogOptions.tag,
        layout: "Blog",
        itemPath: blogOptions.tagItem,
        itemLayout: "Blog",
      },
    ],

    type: [
      {
        key: "article",
        sorter,
        filter: () => true,
        path: blogOptions.article,
        layout: "Blog",
      },
      {
        key: "encrypted",
        sorter,
        filter: ({ routeMeta }) => Boolean(routeMeta.isEncrypted),
        path: blogOptions.encrypted,
        layout: "Blog",
      },
      {
        key: "slide",
        sorter,
        filter: ({ routeMeta }) => routeMeta.type === "slide",
        path: blogOptions.slides,
        layout: "Blog",
      },
      {
        key: "star",
        sorter,
        filter: ({ frontmatter }) => Boolean(frontmatter.star),
        path: blogOptions.star,
        layout: "Blog",
      },
      {
        key: "timeline",
        sorter: (pageA, pageB) =>
          compareDate(
            pageA.routeMeta.date as Date | undefined,
            pageB.routeMeta.date as Date | undefined
          ),
        filter: ({ frontmatter, routeMeta }) =>
          "date" in routeMeta && frontmatter.timeline !== false,
        path: blogOptions.timeline,
        layout: "Blog",
      },
    ],
  };
};
