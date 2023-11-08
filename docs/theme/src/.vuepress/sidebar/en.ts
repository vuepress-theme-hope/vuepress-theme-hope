import { sidebar } from "docs-shared";

export const enSidebarConfig = sidebar({
  "/": [
    "",
    "get-started/",
    {
      text: "Guide",
      icon: "lightbulb",
      prefix: "guide/",
      children: [
        "get-started/",
        "interface/",
        "layout/",
        "markdown/",
        "feature/",
        "blog/",
        "advanced/",
      ],
    },
    {
      text: "Config",
      icon: "gears",
      prefix: "config/",
      children: [
        "intro",
        "i18n",
        "theme/",
        "plugins/",
        "frontmatter/",
        "style",
      ],
    },
    {
      text: "Cookbook",
      icon: "signs-post",
      prefix: "cookbook/",
      children: ["markdown/", "vuepress/", "customize/"],
    },

    "demo/",
    {
      text: "FAQ",
      icon: "circle-question",
      prefix: "faq/",
      children: ["", "troubleshooting", "common-error", "vite", "safari"],
    },
    {
      text: "Migration",
      icon: "code-compare",
      prefix: "migration/",
      children: ["highlight", "config", "page", "style"],
    },
    "changelog",
    "contribution",
  ],

  "/get-started/": "structure",

  "/guide/": "structure",

  "/config/": "structure",

  "/cookbook/": "structure",

  "/demo/": "structure",
});
