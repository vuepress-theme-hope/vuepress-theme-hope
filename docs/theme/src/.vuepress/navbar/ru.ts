import { navbar } from "docs-shared";

export const ruNavbarConfig = navbar([
  "/ru/guide/",
  "/ru/config/",
  "/ru/faq/",
  {
    text: "Cookbook",
    icon: "guide",
    prefix: "/ru/cookbook/",
    children: ["tutorial/", "markdown/", "vuepress/", "advanced/"],
  },
  "/ru/migration/",
  {
    text: "Проект",
    icon: "info",
    prefix: "/ru/",
    children: [
      "changelog",
      "demo",
      "contribution",
      {
        text: "Plugins",
        icon: "plugin",
        children: [
          {
            text: "Blog Plugin",
            icon: "blog",
            link: "https://vuepress-theme-hope.github.io/v2/blog/ru/",
          },
          {
            text: "Comment Plugin",
            icon: "comment",
            link: "https://vuepress-theme-hope.github.io/v2/comment/ru/",
          },
          {
            text: "Components Plugin",
            icon: "plugin",
            link: "https://vuepress-theme-hope.github.io/v2/components/ru/",
          },
          {
            text: "Copy Code Plugin",
            icon: "copy",
            link: "https://vuepress-theme-hope.github.io/v2/copy-code/ru/",
          },
          {
            text: "Copyright Plugin",
            icon: "copyright",
            link: "https://vuepress-theme-hope.github.io/v2/copyright/ru/",
          },
          {
            text: "Feed Plugin",
            icon: "rss",
            link: "https://vuepress-theme-hope.github.io/v2/feed/ru/",
          },
          {
            text: "LightGallery Plugin",
            icon: "pic",
            link: "https://vuepress-theme-hope.github.io/v2/lightgallery/ru/",
          },
          {
            text: "Markdown Enhance Plugin",
            icon: "markdown",
            link: "https://vuepress-theme-hope.github.io/v2/md-enhance/ru/",
          },
          {
            text: "Photo Swipe Plugin",
            icon: "pic",
            link: "https://vuepress-theme-hope.github.io/v2/photo-swipe/ru/",
          },
          {
            text: "PWA Plugin",
            icon: "app",
            link: "https://vuepress-theme-hope.github.io/v2/pwa/ru/",
          },
          {
            text: "Reading Time Plugin",
            icon: "read",
            link: "https://vuepress-theme-hope.github.io/v2/reading-time/ru/",
          },
          {
            text: "Redirect Plugin",
            icon: "navigation",
            link: "https://vuepress-theme-hope.github.io/v2/redirect/ru/",
          },
          {
            text: "Sass Palette Plugin",
            icon: "palette",
            link: "https://vuepress-theme-hope.github.io/v2/sass-palette/ru/",
          },
          {
            text: "Seo Plugin",
            icon: "strong",
            link: "https://vuepress-theme-hope.github.io/v2/seo/ru/",
          },
          {
            text: "Sitemap Plugin",
            icon: "sitemap",
            link: "https://vuepress-theme-hope.github.io/v2/sitemap/ru/",
          },
        ],
      },
    ],
  },
]);
