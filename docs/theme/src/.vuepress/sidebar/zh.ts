import { sidebar } from "docs-shared";

// region config
export const zhSidebarConfig = sidebar({
  "/zh/": [
    "",
    "get-started/",
    {
      text: "指南",
      icon: "lightbulb",
      prefix: "guide/",
      children: [
        "intro/",
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
      text: "配置",
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
      text: "教程",
      icon: "signs-post",
      prefix: "cookbook/",
      children: ["markdown/", "vuepress/"],
    },
    "demo/",
    "faq/",
    "migration/",
    "changelog",
    "contribution",
  ],

  "/zh/get-started/": "structure",

  "/zh/guide/": "structure",

  "/zh/config/": "structure",

  "/zh/cookbook/": "structure",

  "/zh/demo/": "structure",

  "/zh/faq/": "structure",

  "/zh/migration/": "structure",
});
// #endregion config
