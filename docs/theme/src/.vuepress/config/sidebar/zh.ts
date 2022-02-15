import type { HopeThemeSidebarConfig } from "vuepress-theme-hope";

export const zhSidebarConfig: HopeThemeSidebarConfig = {
  "/zh/guide/": [
    {
      text: "快速上手",
      icon: "creative",
      prefix: "get-started/",
      children: ["intro", "install", "markdown"],
    },
    {
      text: "界面",
      icon: "skin",
      prefix: "interface/",
      children: ["darkmode", "theme-color", "icon", "accessibility", "others"],
    },
    {
      text: "布局",
      icon: "layout",
      prefix: "layout/",
      children: [
        "navbar",
        "sidebar",
        {
          text: "Page",
          icon: "page",
          children: ["page", "breadcrumb", "footer"],
        },
        "home",
        "slides",
      ],
    },
    {
      text: "Markdown 增强",
      icon: "markdown",
      prefix: "markdown/",
      children: [
        "intro",
        "container",
        "components",
        "code-group",
        "align",
        "sup-sub",
        "footnote",
        "mark",
        "tasklist",
        "tex",
        "flowchart",
        "mermaid",
        "demo",
        "presentation",
        "external",
      ],
    },
    {
      text: "功能",
      icon: "discover",
      prefix: "feature/",
      children: [
        "page-info",
        "comment",
        "copy-code",
        "photo-swipe",
        "meta",
        "encrypt",
        "pwa",
        "feed",
        "seo",
        "sitemap",
      ],
    },
    {
      text: "博客",
      icon: "layout",
      prefix: "blog/",
      children: ["intro", "article", "category-and-tags", "timeline", "home"],
    },
  ],

  "/zh/config/": [
    "intro",
    "i18n",
    {
      text: "主题配置",
      icon: "config",
      prefix: "theme/",
      children: ["", "feature", "layout", "apperance"],
    },
    {
      text: "插件配置",
      icon: "plugin",
      prefix: "plugins/",
      children: [
        "intro",
        "blog",
        "comment",
        "feed",
        "md-enhance",
        "pwa",
        "others",
      ],
    },
    "page",
    "style",
  ],

  "/zh/basic/": [
    {
      text: "Markdown",
      icon: "markdown",
      prefix: "markdown/",
      children: [
        "",
        "demo",
        {
          text: "Emoji",
          icon: "emoji",
          link: "emoji/",
          prefix: "emoji/",
          children: ["people", "nature", "object", "place", "symbol"],
        },
      ],
    },
    {
      text: "VuePress",
      icon: "vue",
      prefix: "vuepress/",
      children: ["", "file", "markdown", "config", "plugin", "theme"],
    },
  ],

  "/zh/": [
    "",
    {
      text: "指南",
      icon: "creative",
      prefix: "guide/",
      children: [
        "get-started/",
        "interface/",
        "layout/",
        "markdown/",
        "feature/",
        "blog/",
      ],
    },
    {
      text: "配置",
      icon: "config",
      prefix: "config/",
      children: ["intro", "i18n", "theme/", "plugins/", "page", "style"],
    },
    {
      text: "基础",
      icon: "module",
      prefix: "basic/",
      children: ["tutorial", "markdown/", "vuepress/"],
    },
    "changelog",
    "faq",
    "demo/",
    "contribution",
  ],
};
