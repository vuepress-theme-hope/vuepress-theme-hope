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
      children: [
        "/guide/README.md",
        "/guide/page.md",
        "/guide/markdown.md",
        "/guide/disable.md",
        "/guide/encrypt.md",
      ],
    },
  ],
};
