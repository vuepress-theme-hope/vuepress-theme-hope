import { navbar } from "docs-shared";
import { getLinkHelper } from "./utils.js";

const linkHelper = getLinkHelper("/zh/");

export const zhNavbarConfig = navbar([
  "/zh/guide/",
  "/zh/config/",
  "/zh/faq/",
  {
    text: "教程",
    icon: "signs-post",
    prefix: "/zh/cookbook/",
    children: ["tutorial/", "markdown/", "vuepress/", "customize/"],
  },
  "/zh/migration/",
  {
    text: "项目",
    icon: "circle-info",
    prefix: "/zh/",
    children: [
      "changelog",
      "demo/",
      "contribution",
      {
        text: "插件",
        icon: "puzzle-piece",
        children: [
          {
            text: "自动目录插件",
            icon: "network-wired",
            link: linkHelper("auto-catalog"),
          },
          {
            text: "博客插件",
            icon: "blog",
            link: linkHelper("blog2"),
          },
          {
            text: "评论插件",
            icon: "comment",
            link: linkHelper("comment2"),
          },
          {
            text: "组件库",
            icon: "puzzle-piece",
            link: linkHelper("components"),
          },
          {
            text: "代码复制插件",
            icon: "copy",
            link: linkHelper("copy-code2"),
          },
          {
            text: "版权信息插件",
            icon: "copyright",
            link: linkHelper("copyright2"),
          },
          {
            text: "Feed 插件",
            icon: "rss",
            link: linkHelper("feed2"),
          },
          {
            text: "LightGallery 插件",
            icon: "image",
            link: linkHelper("lightgallery"),
          },
          {
            text: "Markdown 增强插件",
            icon: "fab fa-markdown",
            link: linkHelper("md-enhance"),
          },
          {
            text: "图片预览插件",
            icon: "image",
            link: linkHelper("photo-swipe"),
          },
          {
            text: "PWA 插件",
            icon: "mobile",
            link: linkHelper("pwa2"),
          },
          {
            text: "阅读时间插件",
            icon: "book-open",
            link: linkHelper("reading-time2"),
          },
          {
            text: "移除 PWA 插件",
            icon: "trash-can",
            link: linkHelper("remove-pwa"),
          },
          {
            text: "重定向插件",
            icon: "fas fa-eject fa-rotate-90",
            link: linkHelper("redirect"),
          },
          {
            text: "Sass 调色板插件",
            icon: "palette",
            link: linkHelper("sass-palette"),
          },
          {
            text: "客户端搜索插件",
            icon: "search",
            link: linkHelper("search-pro"),
          },
          {
            text: "Seo 插件",
            icon: "wrench",
            link: linkHelper("seo2"),
          },
          {
            text: "VuePress 工具函数",
            icon: "toolbox",
            link: linkHelper("shared"),
          },
          {
            text: "Sitemap 插件",
            icon: "sitemap",
            link: linkHelper("sitemap2"),
          },
        ],
      },
    ],
  },
]);
