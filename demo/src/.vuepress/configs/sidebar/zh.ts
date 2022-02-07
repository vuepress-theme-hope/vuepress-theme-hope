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
  ],
};
