import type { SidebarConfig } from "vuepress-theme-hope";

export const en: SidebarConfig = {
  "/": [
    "/README.md",
    "/home.md",
    "/slides.md",
    "/layout.md",
    {
      icon: "creative",
      text: "Guide",
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
