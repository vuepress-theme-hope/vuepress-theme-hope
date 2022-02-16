import type { HopeThemeSidebarConfig } from "vuepress-theme-hope";

export const en: HopeThemeSidebarConfig = {
  "/": [
    "/README.md",
    "/home.md",
    "/slides.md",
    {
      icon: "creative",
      text: "Guide",
      collapsable: true,
      prefix: "/guide/",
      link: "/guide/README.md",
      children: ["page.md", "markdown.md", "disable.md", "encrypt.md"],
    },
    {
      text: "Articles",
      icon: "note",
      prefix: "/posts/",
      children: [
        {
          text: "Articles 1-4",
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
          text: "Articles 5-12",
          icon: "note",
          children: [
            {
              text: "Articles 5-8",
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
              text: "Articles 9-12",
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
