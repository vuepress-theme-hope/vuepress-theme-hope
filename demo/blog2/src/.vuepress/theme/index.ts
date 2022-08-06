import { defaultTheme } from "@vuepress/theme-default";
import { path } from "@vuepress/utils";
import { blogPlugin } from "vuepress-plugin-blog2";

import type { Theme } from "@vuepress/core";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

export const blogTheme = (options: DefaultThemeOptions): Theme => ({
  name: "blog-theme",

  // we are extending @vuepress/theme-default
  extends: defaultTheme(options),

  // we provide some blog layouts
  layouts: {
    Article: path.resolve(__dirname, "./layouts/Article.vue"),
    Category: path.resolve(__dirname, "./layouts/Category.vue"),
    Tag: path.resolve(__dirname, "./layouts/Tag.vue"),
    Timeline: path.resolve(__dirname, "./layouts/Timeline.vue"),
  },

  plugins: [
    blogPlugin({
      // only files under posts are articles
      filter: ({ filePathRelative }) =>
        filePathRelative && filePathRelative.startsWith("posts/"),

      // getting article info
      getInfo: ({ frontmatter, title }) => ({
        title,
        author: frontmatter.author || "",
        date: frontmatter.date || null,
        category: frontmatter.category || [],
        tag: frontmatter.tag || [],
      }),

      category: [
        {
          key: "category",
          getter: (page) => <string[]>page.frontmatter.category || [],
          layout: "Category",
          itemLayout: "Category",
          frontmatter: () => ({ title: "Categories", sidebar: false }),
          itemFrontmatter: (name) => ({
            title: `Category ${name}`,
            sidebar: false,
          }),
        },
        {
          key: "tag",
          getter: (page) => <string[]>page.frontmatter.tag || [],
          layout: "Tag",
          itemLayout: "Tag",
          frontmatter: () => ({ title: "Tags", sidebar: false }),
          itemFrontmatter: (name) => ({
            title: `Tag ${name}`,
            sidebar: false,
          }),
        },
      ],

      type: [
        {
          key: "article",
          // remove archive articles
          filter: (page) => !page.frontmatter.archive,
          path: "/article/",
          layout: "Article",
          frontmatter: () => ({ title: "Articles", sidebar: false }),
          // sort pages with time and sticky
          sorter: (pageA, pageB) => {
            if (pageA.frontmatter.sticky && pageB.frontmatter.sticky)
              return pageB.frontmatter.sticky - pageA.frontmatter.sticky;

            if (pageA.frontmatter.sticky && !pageB.frontmatter.sticky)
              return -1;

            if (!pageA.frontmatter.sticky && pageB.frontmatter.sticky) return 1;

            if (!pageB.frontmatter.date) return 1;
            if (!pageA.frontmatter.date) return -1;

            return (
              new Date(pageB.frontmatter.date).getTime() -
              new Date(pageA.frontmatter.date).getTime()
            );
          },
        },
        {
          key: "timeline",
          // only article with date should be added to timeline
          filter: (page) => page.frontmatter.date,
          // sort pages with time
          sorter: (pageA, pageB) =>
            new Date(pageB.frontmatter.date).getTime() -
            new Date(pageA.frontmatter.date).getTime(),
          path: "/timeline/",
          layout: "Timeline",
          frontmatter: () => ({ title: "Timeline", sidebar: false }),
        },
      ],
      hotReload: true,
    }),
  ],
});
