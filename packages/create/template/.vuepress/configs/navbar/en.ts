import type { HopeThemeNavbarConfig } from "vuepress-theme-hope";

export const en: HopeThemeNavbarConfig = [
  "/README.md",
  "/home.md",
  { text: "Guide", icon: "creative", link: "/guide/README.md" },
  {
    text: "Posts",
    icon: "edit",
    prefix: "/posts/",
    children: [
      {
        text: "Articles 1-4",
        icon: "edit",
        prefix: "article/",
        children: [
          { text: "Article 1", icon: "edit", link: "article1.md" },
          { text: "Article 2", icon: "edit", link: "article2.md" },
          "article3.md",
          "article4.md",
        ],
      },
      {
        text: "Articles 5-12",
        icon: "edit",
        children: [
          {
            text: "Article 5",
            icon: "edit",
            link: "article/article5.md",
          },
          {
            text: "Article 6",
            icon: "edit",
            link: "article/article6.md",
          },
          "article/article7.md",
          "article/article8.md",
        ],
      },
      { text: "Article 9", icon: "edit", link: "article9.md" },
      { text: "Article 10", icon: "edit", link: "article10.md" },
      "article11.md",
      "article12.md",
    ],
  },
  {
    text: "V2 文档",
    icon: "note",
    link: "https://vuepress-theme-hope.github.io/v2/zh/",
  },
];
