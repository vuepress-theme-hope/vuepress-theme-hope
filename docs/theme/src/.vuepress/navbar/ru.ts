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
            link: "https://vuepress-theme-hope.github.io/v2/blog/ru/",
          },
          {
            text: "Плагин комментариев",
            icon: "comment",
            link: "https://vuepress-theme-hope.github.io/v2/comment/ru/",
          },
          {
            text: "Плагин компонентов",
            icon: "plugin",
            link: "https://vuepress-theme-hope.github.io/v2/components/ru/",
          },
          {
            text: "Плагин копирования кода",
            icon: "copy",
            link: "https://vuepress-theme-hope.github.io/v2/copy-code/ru/",
          },
          {
            text: "Плагин авторских прав",
            icon: "copyright",
            link: "https://vuepress-theme-hope.github.io/v2/copyright/ru/",
          },
          {
            text: "Плагин фида",
            icon: "rss",
            link: "https://vuepress-theme-hope.github.io/v2/feed/ru/",
          },
          {
            text: "Плагин галереи",
            icon: "pic",
            link: "https://vuepress-theme-hope.github.io/v2/lightgallery/ru/",
          },
          {
            text: "Плагин улучшения разметки",
            icon: "markdown",
            link: "https://vuepress-theme-hope.github.io/v2/md-enhance/ru/",
          },
          {
            text: "Плагин свайпа фото",
            icon: "pic",
            link: "https://vuepress-theme-hope.github.io/v2/photo-swipe/ru/",
          },
          {
            text: "Плагин PWA",
            icon: "app",
            link: "https://vuepress-theme-hope.github.io/v2/pwa/ru/",
          },
          {
            text: "Плагин время чтения",
            icon: "read",
            link: "https://vuepress-theme-hope.github.io/v2/reading-time/ru/",
          },
          {
            text: "Плагин редиректа",
            icon: "navigation",
            link: "https://vuepress-theme-hope.github.io/v2/redirect/ru/",
          },
          {
            text: "Плагин палитры Sass",
            icon: "palette",
            link: "https://vuepress-theme-hope.github.io/v2/sass-palette/ru/",
          },
          {
            text: "Плагин СЕО",
            icon: "strong",
            link: "https://vuepress-theme-hope.github.io/v2/seo/ru/",
          },
          {
            text: "Плагин карты сайта",
            icon: "sitemap",
            link: "https://vuepress-theme-hope.github.io/v2/sitemap/ru/",
          },
        ],
      },
    ],
  },
]);
