import { sidebar } from "docs-shared";

export const enSidebarConfig = sidebar({
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
        "advanced/",
      ],
    },
    {
      text: "Config",
      icon: "config",
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
      icon: "guide",
      prefix: "cookbook/",
      children: [
        "tutorial/",
        "markdown/",
        "vuepress/",
        "advanced/",
        "customize/",
      ],
    },
    {
      text: "Migration",
      icon: "change",
      prefix: "migration/",
      children: ["highlight", "config", "page", "style"],
    },
    {
      text: "FAQ",
      icon: "question",
      prefix: "faq/",
      children: ["", "troubleshooting", "common-error", "vite", "safari"],
    },
    "demo",
    "changelog",
    "contribution",
  ],

  "/guide/": "structure",

  "/config/": "structure",

  "/cookbook/": "structure",
});
