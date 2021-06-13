import type { SidebarConfig } from "vuepress-theme-hope";

export const en: SidebarConfig = {
  "/": [
    "/readme.md",
    "/home.md",
    "/slides.md",
    "/layout.md",
    {
      icon: "creative",
      text: "Guide",
      children: [
        "/guide/readme.md",
        "/guide/page.md",
        "/guide/markdown.md",
        "/guide/disable.md",
        "/guide/encrypt.md",
      ],
    },
  ],
};
