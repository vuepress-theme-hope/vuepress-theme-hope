import { navbar } from "docs-shared";
import { getLinkHelper } from "./utils.js";

const linkHelper = getLinkHelper("/zh/");

export const zhNavbarConfig = navbar([
  "/zh/guide/",
  "/zh/config/",
  "/zh/faq/",
  {
    text: "教程",
    icon: "guide",
    prefix: "/zh/cookbook/",
    children: ["tutorial/", "markdown/", "vuepress/", "advanced/"],
  },
  "/zh/migration/",
  {
    text: "项目",
    icon: "info",
    prefix: "/zh/",
    children: [
      "changelog",
      "demo",
      "contribution",
      {
        text: "插件",
        icon: "plugin",
        children: [
          {
            text: "自动目录插件",
            icon: "tree",
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
            icon: "plugin",
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
            link: linkHelper("copyright"),
          },
          {
            text: "Feed 插件",
            icon: "rss",
            link: linkHelper("feed2"),
          },
          {
            text: "LightGallery 插件",
            icon: "pic",
            link: linkHelper("lightgallery"),
          },
          {
            text: "Markdown 增强插件",
            icon: "markdown",
            link: linkHelper("md-enhance"),
          },
          {
            text: "图片预览插件",
            icon: "pic",
            link: linkHelper("photo-swipe"),
          },
          {
            text: "PWA 插件",
            icon: "app",
            link: linkHelper("pwa2"),
          },
          {
            text: "阅读时间插件",
            icon: "read",
            link: linkHelper("reading-time2"),
          },
          {
            text: "移除 PWA 插件",
            icon: "app",
            link: linkHelper("remove-pwa"),
          },
          {
            text: "重定向插件",
            icon: "navigation",
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
            icon: "strong",
            link: linkHelper("seo2"),
          },
          {
            text: "VuePress 工具函数",
            icon: "app",
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
