import type { Page } from "@vuepress/core";
import type { BlogOptions } from "vuepress-plugin-blog2";
import type { HopeThemeConfig } from "../../shared";

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

export const resolveBlogOptions = (
  themeConfig: HopeThemeConfig
): BlogOptions | false => {
  if (themeConfig.enableBlog === false) return false;

  return {
    metaScope: "",
    filter: ({ frontmatter, filePathRelative, routeMeta }) =>
      filePathRelative &&
      frontmatter.home !== true &&
      routeMeta.type !== "page",
    category: [
      {
        key: "category",
        getter: ({ routeMeta }) => routeMeta.category || [],
        sorter,
        path: "/category/",
        layout: "Blog",
        itemPath: "/category/:name/",
        itemLayout: "Blog",
      },
      {
        key: "tag",
        getter: ({ routeMeta }) => routeMeta.tag || [],
        sorter,
        path: "/tag/",
        layout: "Blog",
        itemPath: "/tag/:name/",
        itemLayout: "Blog",
      },
    ],
    type: [
      {
        key: "article",
        sorter,
        filter: () => true,
        path: "/article/",
        layout: "Blog",
      },
      {
        key: "encrypted",
        sorter,
        filter: ({ routeMeta }) => routeMeta.isEncrypted,
        path: "/encrypted/",
        layout: "Blog",
      },
      {
        key: "slide",
        sorter,
        filter: ({ routeMeta }) => routeMeta.type === "slide",
        path: "/slide/",
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
          routeMeta.date && frontmatter.timeline !== false,
        path: "/timeline/",
        layout: "Blog",
      },
      {
        key: "star",
        sorter,
        filter: ({ frontmatter }) => frontmatter.star,
        path: "/star/",
        layout: "Blog",
      },
    ],
  } as BlogOptions;
};
