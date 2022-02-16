import type { HopeThemeNavbarConfig } from "vuepress-theme-hope";
export const zhNavbarConfig: HopeThemeNavbarConfig = [
  "/zh/guide/",
  "/zh/config/",
  "/zh/faq/",
  {
    text: "基础",
    icon: "info",
    prefix: "/zh/basic/",
    children: ["tutorial", "markdown/", "vuepress/"],
  },
  "migration/",
  {
    text: "项目",
    icon: "info",
    prefix: "/zh/",
    children: [
      "changelog",
      "demo/",
      "contribution",
      {
        text: "插件",
        icon: "plugin",
        children: [
          {
            text: "AddThis 插件",
            link: "https://vuepress-theme-hope.github.io/v2/add-this/zh/",
          },
          {
            text: "评论插件",
            link: "https://vuepress-theme-hope.github.io/v2/comment/zh/",
          },
          {
            text: "组件库",
            link: "https://vuepress-theme-hope.github.io/v2/components/zh/",
          },
          {
            text: "代码复制插件",
            link: "https://vuepress-theme-hope.github.io/v2/copy-code/zh/",
          },
          {
            text: "Feed 插件",
            link: "https://vuepress-theme-hope.github.io/v2/feed/zh/",
          },

          {
            text: "Markdown 增强插件",
            link: "https://vuepress-theme-hope.github.io/v2/md-enhance/zh/",
          },
          {
            text: "图片预览插件",
            link: "https://vuepress-theme-hope.github.io/v2/photo-swipe/zh/",
          },
          {
            text: "PWA 插件",
            link: "https://vuepress-theme-hope.github.io/v2/pwa/zh/",
          },
          {
            text: "阅读时间插件",
            link: "https://vuepress-theme-hope.github.io/v2/reading-time/zh/",
          },
          {
            text: "Seo 插件",
            link: "https://vuepress-theme-hope.github.io/v2/seo/zh/",
          },
        ],
      },
    ],
  },
];
