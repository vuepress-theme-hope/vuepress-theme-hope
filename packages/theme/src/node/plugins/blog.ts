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
    filter: ({ routeMeta }) => routeMeta.type !== "page",
    category: [
      {
        key: "category",
        getter: ({ routeMeta }) => routeMeta.category || [],
        sorter,
        layout: "Layout",
        itemLayout: "Layout",
      },
      {
        key: "tag",
        getter: ({ routeMeta }) => routeMeta.tag || [],
        sorter,
        layout: "Layout",
        itemLayout: "Layout",
      },
    ],
    type: [
      {
        key: "slide",
        sorter,
        filter: ({ routeMeta }) => routeMeta.type === "slide",
      },
      {
        key: "encrypted",
        sorter,
        filter: ({ routeMeta }) => routeMeta.isEncrypted,
      },
      {
        key: "timeline",
        sorter,
        filter: ({ frontmatter, routeMeta }) =>
          routeMeta.date && frontmatter.timeline !== false,
      },
      {
        key: "star",
        sorter,
        filter: ({ frontmatter }) => frontmatter.star,
      },
    ],
  } as BlogOptions;
};
