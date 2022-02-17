import type { HopeThemeNavbarConfig } from "vuepress-theme-hope";

export const enNavbarConfig: HopeThemeNavbarConfig = [
  "/guide/",
  "/config/",
  "/faq/",
  {
    text: "Basic",
    icon: "info",
    prefix: "/basic/",
    children: ["tutorial", "markdown/", "vuepress/"],
  },
  "/migration/",
  {
    text: "Project",
    icon: "info",
    children: [
      "/changelog",
      "/demo/",
      "/contribution",
      {
        text: "Plugins",
        icon: "plugin",
        children: [
          {
            text: "AddThis Plugin",
            link: "https://vuepress-theme-hope.github.io/v2/add-this/",
          },
          {
            text: "Comment Plugin",
            link: "https://vuepress-theme-hope.github.io/v2/comment/",
          },
          {
            text: "Components Plugin",
            link: "https://vuepress-theme-hope.github.io/v2/components/",
          },
          {
            text: "Copy Code Plugin",
            link: "https://vuepress-theme-hope.github.io/v2/copy-code/",
          },
          {
            text: "Feed Plugin",
            link: "https://vuepress-theme-hope.github.io/v2/feed/",
          },
          {
            text: "Markdown Enhance Plugin",
            link: "https://vuepress-theme-hope.github.io/v2/md-enhance/",
          },
          {
            text: "Photo Swipe Plugin",
            link: "https://vuepress-theme-hope.github.io/v2/photo-swipe/",
          },
          {
            text: "PWA Plugin",
            link: "https://vuepress-theme-hope.github.io/v2/pwa/",
          },
          {
            text: "Reading Time Plugin",
            link: "https://vuepress-theme-hope.github.io/v2/reading-time/",
          },
          {
            text: "Seo Plugin",
            link: "https://vuepress-theme-hope.github.io/v2/seo/",
          },
        ],
      },
    ],
  },
];
