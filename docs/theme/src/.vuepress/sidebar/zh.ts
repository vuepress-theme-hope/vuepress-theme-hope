import { sidebar } from "docs-shared";

export const zhSidebarConfig = sidebar({
  "/zh/": [
    "",
    {
      text: "指南",
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
      children: ["tutorial/", "markdown/", "vuepress/", "customize/"],
    },
    {
      text: "迁移",
      icon: "code-compare",
      prefix: "migration/",
      children: ["highlight", "config", "page", "style"],
    },
    {
      text: "常见问题",
      icon: "circle-question",
      prefix: "faq/",
      children: ["", "troubleshooting", "common-error", "vite", "safari"],
    },
    "demo/",
    "changelog",
    "contribution",
  ],

  "/zh/guide/": "structure",

  "/zh/config/": "structure",

  "/zh/cookbook/": "structure",

  "/zh/demo/": "structure",
});
