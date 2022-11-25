import { navbar } from "docs-shared";

export const ruNavbarConfig = navbar([
  "/ru/guide/",
  "/ru/config/",
  "/ru/faq/",
  {
    text: "Учебник с примерами",
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
        text: "Плагины",
        icon: "plugin",
        children: [
          {
            text: "Плагин блога",
            icon: "blog",
            link: "https://vuepress-theme-hope.github.io/v2/blog/",
          },
          {
            text: "Плагин комментариев",
            icon: "comment",
            link: "https://vuepress-theme-hope.github.io/v2/comment/",
          },
          {
            text: "Плагин компонентов",
            icon: "plugin",
            link: "https://vuepress-theme-hope.github.io/v2/components/",
          },
          {
            text: "Плагин копирования кода",
            icon: "copy",
            link: "https://vuepress-theme-hope.github.io/v2/copy-code/",
          },
          {
            text: "Плагин авторских прав",
            icon: "copyright",
            link: "https://vuepress-theme-hope.github.io/v2/copyright/",
          },
          {
            text: "Плагин фида",
            icon: "rss",
            link: "https://vuepress-theme-hope.github.io/v2/feed/",
          },
          {
            text: "Плагин галереи",
            icon: "pic",
            link: "https://vuepress-theme-hope.github.io/v2/lightgallery/",
          },
          {
            text: "Плагин улучшения разметки",
            icon: "markdown",
            link: "https://vuepress-theme-hope.github.io/v2/md-enhance/",
          },
          {
            text: "Плагин свайпа фото",
            icon: "pic",
            link: "https://vuepress-theme-hope.github.io/v2/photo-swipe/",
          },
          {
            text: "Плагин PWA",
            icon: "app",
            link: "https://vuepress-theme-hope.github.io/v2/pwa/",
          },
          {
            text: "Плагин время чтения",
            icon: "read",
            link: "https://vuepress-theme-hope.github.io/v2/reading-time/",
          },
          {
            text: "Remove PWA Plugin",
            icon: "app",
            link: "https://vuepress-theme-hope.github.io/v2/remove-pwa/",
          },
          {
            text: "Плагин редиректа",
            icon: "navigation",
            link: "https://vuepress-theme-hope.github.io/v2/redirect/",
          },
          {
            text: "Плагин палитры Sass",
            icon: "palette",
            link: "https://vuepress-theme-hope.github.io/v2/sass-palette/",
          },
          {
            text: "Client Search Plugin",
            icon: "search",
            link: "https://vuepress-theme-hope.github.io/v2/search-pro/",
          },
          {
            text: "Плагин СЕО",
            icon: "strong",
            link: "https://vuepress-theme-hope.github.io/v2/seo/",
          },
          {
            text: "Плагин карты сайта",
            icon: "sitemap",
            link: "https://vuepress-theme-hope.github.io/v2/sitemap/",
          },
        ],
      },
    ],
  },
]);
