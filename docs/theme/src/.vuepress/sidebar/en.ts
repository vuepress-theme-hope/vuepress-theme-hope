import { sidebar } from "docs-shared";

// region config
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
        "customize/",
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
      children: ["markdown/", "vuepress/"],
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
// #endregion config
