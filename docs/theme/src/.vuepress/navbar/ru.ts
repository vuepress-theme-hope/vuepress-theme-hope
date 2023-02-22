import { navbar } from "docs-shared";
import { getLinkHelper } from "./utils.js";

const linkHelper = getLinkHelper();

export const ruNavbarConfig = navbar([
  "/ru/guide/",
  "/ru/config/",
  "/ru/faq/",
  {
    text: "Учебник с примерами",
    icon: "signs-post",
    prefix: "/ru/cookbook/",
    children: ["tutorial/", "markdown/", "vuepress/", "advanced/"],
  },
  "/ru/migration/",
  {
    text: "Проект",
    icon: "circle-info",
    prefix: "/ru/",
    children: [
      "changelog",
      "demo",
      "contribution",
      {
        text: "Плагины",
        icon: "puzzle-piece",
        children: [
          {
            text: "Auto catalog Plugin",
            icon: "network-wired",
            link: linkHelper("auto-catalog"),
          },
          {
            text: "Плагин блога",
            icon: "blog",
            link: linkHelper("blog2"),
          },
          {
            text: "Плагин комментариев",
            icon: "comment",
            link: linkHelper("comment2"),
          },
          {
            text: "Плагин компонентов",
            icon: "puzzle-piece",
            link: linkHelper("components"),
          },
          {
            text: "Плагин копирования кода",
            icon: "copy",
            link: linkHelper("copy-code2"),
          },
          {
            text: "Плагин авторских прав",
            icon: "copyright",
            link: linkHelper("copyright"),
          },
          {
            text: "Плагин фида",
            icon: "rss",
            link: linkHelper("feed2"),
          },
          {
            text: "Плагин галереи",
            icon: "image",
            link: linkHelper("lightgallery"),
          },
          {
            text: "Плагин улучшения разметки",
            icon: "fab fa-markdown",
            link: linkHelper("md-enhance"),
          },
          {
            text: "Плагин свайпа фото",
            icon: "image",
            link: linkHelper("photo-swipe"),
          },
          {
            text: "Плагин PWA",
            icon: "mobile",
            link: linkHelper("pwa2"),
          },
          {
            text: "Плагин время чтения",
            icon: "book-open",
            link: linkHelper("reading-time2"),
          },
          {
            text: "Remove PWA Plugin",
            icon: "trash-can",
            link: linkHelper("remove-pwa"),
          },
          {
            text: "Плагин редиректа",
            icon: "fas fa-eject fa-rotate-90",
            link: linkHelper("redirect"),
          },
          {
            text: "Плагин палитры Sass",
            icon: "palette",
            link: linkHelper("sass-palette"),
          },
          {
            text: "Client Search Plugin",
            icon: "search",
            link: linkHelper("search-pro"),
          },
          {
            text: "Плагин СЕО",
            icon: "wrench",
            link: linkHelper("seo2"),
          },
          {
            text: "VuePress shared",
            icon: "toolbox",
            link: linkHelper("shared"),
          },
          {
            text: "Плагин карты сайта",
            icon: "sitemap",
            link: linkHelper("sitemap2"),
          },
        ],
      },
    ],
  },
]);
