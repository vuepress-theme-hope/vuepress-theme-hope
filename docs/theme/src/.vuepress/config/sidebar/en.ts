import type { HopeThemeSidebarConfig } from "vuepress-theme-hope";

export const enSidebarConfig: HopeThemeSidebarConfig = {
  "/guide/": [
    {
      text: "Get Started",
      icon: "creative",
      prefix: "get-started/",
      children: ["intro", "install", "markdown"],
    },
    {
      text: "Interface",
      icon: "skin",
      prefix: "interface/",
      children: ["darkmode", "theme-color", "icon", "accessibility", "others"],
    },
    {
      text: "Layout",
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
      text: "Markdown enhance",
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
      text: "Features",
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
      text: "Blog",
      icon: "layout",
      prefix: "blog/",
      children: ["intro", "article", "category-and-tags", "timeline", "home"],
    },
  ],

  "/config/": [
    "intro",
    "i18n",
    {
      text: "Theme Config",
      icon: "config",
      prefix: "theme/",
      children: ["", "feature", "layout", "apperance"],
    },
    {
      text: "Plugin Config",
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

  "/basic/": [
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

  "/": [
    "",
    {
      text: "Guide",
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
      text: "Config",
      icon: "config",
      prefix: "config/",
      children: ["intro", "i18n", "theme/", "plugins/", "page", "style"],
    },
    {
      text: "Basic",
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
