import type { HopeThemeSidebarConfig } from "vuepress-theme-hope";

export const zh: HopeThemeSidebarConfig = {
  "/zh/": [
    "/zh/README.md",
    "/zh/home.md",
    "/zh/slides.md",
    {
      text: "如何使用",
      icon: "creative",
      children: [
        "/zh/guide/README.md",
        "/zh/guide/page.md",
        "/zh/guide/markdown.md",
        "/zh/guide/disable.md",
        "/zh/guide/encrypt.md",
      ],
    },
    {
      text: "文章",
      icon: "note",
      prefix: "/posts/",
      children: [
        {
          text: "文章 1-4",
          icon: "note",
          collapsable: true,
          prefix: "article/",
          children: [
            "article1.md",
            "article2.md",
            "article3.md",
            "article4.md",
          ],
        },
        {
          text: "文章 5-12",
          icon: "note",
          children: [
            {
              text: "文章 5-8",
              icon: "note",
              collapsable: true,
              prefix: "article/",
              children: [
                "article5.md",
                "article6.md",
                "article7.md",
                "article8.md",
              ],
            },
            {
              text: "文章 9-12",
              icon: "note",
              children: [
                "article9.md",
                "article10.md",
                "article11.md",
                "article12.md",
              ],
            },
          ],
        },
      ],
    },
  ],
};
