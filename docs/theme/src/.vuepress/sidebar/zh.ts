import { sidebar } from "docs-shared";

export const zhSidebarConfig = sidebar({
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
        "advanced/",
      ],
    },
    {
      text: "配置",
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
      text: "教程",
      icon: "guide",
      prefix: "cookbook/",
      children: ["tutorial/", "markdown/", "vuepress/", "advanced/"],
    },
    {
      text: "迁移",
      icon: "change",
      prefix: "migration/",
      children: ["highlight", "config", "page", "style"],
    },
    {
      text: "常见问题",
      icon: "question",
      prefix: "faq/",
      children: ["", "troubleshooting", "common-error", "vite", "safari"],
    },
    "demo",
    "changelog",
    "contribution",
  ],

  "/zh/guide/": "structure",

  "/zh/config/": "structure",

  "/zh/cookbook/": [
    {
      text: "教程",
      icon: "guide",
      prefix: "tutorial/",
      children: [
        "env",
        "create",
        "command",
        "content",
        "config",
        "structure",
        "deploy",
      ],
    },
    {
      text: "Markdown",
      icon: "markdown",
      prefix: "markdown/",
      collapsible: true,
      children: [
        "",
        "demo",
        {
          text: "Emoji",
          icon: "emoji",
          link: "emoji/",
          prefix: "emoji/",
          collapsible: true,
          children: "structure",
        },
      ],
    },
    {
      text: "VuePress",
      icon: "vue",
      prefix: "vuepress/",
      collapsible: true,
      children: ["", "file", "markdown", "config", "plugin", "theme"],
    },
    {
      text: "高级",
      icon: "advance",
      prefix: "advanced/",
      collapsible: true,
      children: ["component", "style", "replace", "extend"],
    },
  ],
});
