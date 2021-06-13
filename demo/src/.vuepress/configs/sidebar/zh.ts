import type { SidebarConfig } from "vuepress-theme-hope";

export const zh: SidebarConfig = {
  "/zh/": [
    "/zh/readme.md",
    "/zh/home.md",
    "/zh/slides.md",
    "/zh/layout.md",
    {
      text: "如何使用",
      icon: "creative",
      children: [
        "/zh/guide/readme.md",
        "/zh/guide/page.md",
        "/zh/guide/markdown.md",
        "/zh/guide/disable.md",
        "/zh/guide/encrypt.md",
      ],
    },
  ],
};
