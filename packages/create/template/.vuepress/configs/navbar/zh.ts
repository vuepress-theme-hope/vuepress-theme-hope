import type { HopeThemeNavbarConfig } from "vuepress-theme-hope";

export const zh: HopeThemeNavbarConfig = [
  "/zh/README.md",
  "/zh/home.md",
  { text: "使用指南", icon: "creative", link: "/zh/guide/README.md" },
  {
    text: "博文",
    icon: "edit",
    prefix: "/zh/posts/",
    children: [
      {
        text: "文章 1-4",
        icon: "edit",
        prefix: "article/",
        children: [
          { text: "文章 1", icon: "edit", link: "article1.md" },
          { text: "文章 2", icon: "edit", link: "article2.md" },
          "article3.md",
          "article4.md",
        ],
      },
      {
        text: "文章 5-12",
        icon: "edit",
        children: [
          {
            text: "文章 5",
            icon: "edit",
            link: "article/article5.md",
          },
          {
            text: "文章 6",
            icon: "edit",
            link: "article/article6.md",
          },
          "article/article7.md",
          "article/article8.md",
        ],
      },
      { text: "文章 9", icon: "edit", link: "article9.md" },
      { text: "文章 10", icon: "edit", link: "article10.md" },
      "article11.md",
      "article12.md",
    ],
  },
  {
    text: "V2 Docs",
    icon: "note",
    link: "https://vuepress-theme-hope.github.io/v2/",
  },
];
