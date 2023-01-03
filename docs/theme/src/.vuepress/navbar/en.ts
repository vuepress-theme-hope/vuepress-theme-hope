import { navbar } from "docs-shared";
import { getLinkHelper } from "./utils.js";

const linkHelper = getLinkHelper();

export const enNavbarConfig = navbar([
  "/guide/",
  "/config/",
  "/faq/",
  {
    text: "Cookbook",
    icon: "guide",
    prefix: "/cookbook/",
    children: ["tutorial/", "markdown/", "vuepress/", "advanced/"],
  },
  "/migration/",
  {
    text: "Project",
    icon: "info",
    children: [
      "/changelog",
      "/demo",
      "/contribution",
      {
        text: "Plugins",
        icon: "plugin",
        children: [
          {
            text: "Auto catalog Plugin",
            icon: "tree",
            link: linkHelper("auto-catalog"),
          },
          {
            text: "Blog Plugin",
            icon: "blog",
            link: linkHelper("blog2"),
          },
          {
            text: "Comment Plugin",
            icon: "comment",
            link: linkHelper("comment2"),
          },
          {
            text: "Components Plugin",
            icon: "plugin",
            link: linkHelper("components"),
          },
          {
            text: "Copy Code Plugin",
            icon: "copy",
            link: linkHelper("copy-code2"),
          },
          {
            text: "Copyright Plugin",
            icon: "copyright",
            link: linkHelper("copyright"),
          },
          {
            text: "Feed Plugin",
            icon: "rss",
            link: linkHelper("feed2"),
          },
          {
            text: "LightGallery Plugin",
            icon: "pic",
            link: linkHelper("lightgallery"),
          },
          {
            text: "Markdown Enhance Plugin",
            icon: "markdown",
            link: linkHelper("md-enhance"),
          },
          {
            text: "Photo Swipe Plugin",
            icon: "pic",
            link: linkHelper("photo-swipe"),
          },
          {
            text: "PWA Plugin",
            icon: "app",
            link: linkHelper("pwa2"),
          },
          {
            text: "Reading Time Plugin",
            icon: "read",
            link: linkHelper("reading-time2"),
          },
          {
            text: "Remove PWA Plugin",
            icon: "app",
            link: linkHelper("remove-pwa"),
          },
          {
            text: "Redirect Plugin",
            icon: "navigation",
            link: linkHelper("redirect"),
          },
          {
            text: "Sass Palette Plugin",
            icon: "palette",
            link: linkHelper("sass-palette"),
          },
          {
            text: "Client Search Plugin",
            icon: "search",
            link: linkHelper("search-pro"),
          },
          {
            text: "Seo Plugin",
            icon: "strong",
            link: linkHelper("seo2"),
          },
          {
            text: "VuePress shared",
            icon: "app",
            link: linkHelper("shared"),
          },
          {
            text: "Sitemap Plugin",
            icon: "sitemap",
            link: linkHelper("sitemap2"),
          },
        ],
      },
    ],
  },
]);
