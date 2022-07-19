import { sidebar } from "docs-shared";

export const ruSidebarConfig = sidebar({
  "/ru/": [
    "",
    {
      text: "Руководство",
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
      text: "Конфиг",
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
      children: ["tutorial/", "markdown/", "vuepress/", "advanced/"],
    },
    {
      text: "Миграция",
      icon: "change",
      prefix: "migration/",
      children: ["highlight", "config", "page", "style"],
    },
    {
      text: "Часто задаваемые вопросы",
      icon: "question",
      prefix: "faq/",
      children: ["", "troubleshooting", "common-error", "vite", "safari"],
    },
    "demo",
    "changelog",
    "contribution",
  ],

  "/ru/guide/": "structure",

  "/ru/config/": "structure",

  "/ru/cookbook/": [
    {
      text: "Tutorial",
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
      collapsable: true,
      children: [
        "",
        "demo",
        {
          text: "Emoji",
          icon: "emoji",
          link: "emoji/",
          prefix: "emoji/",
          collapsable: true,
          children: "structure",
        },
      ],
    },
    {
      text: "VuePress",
      icon: "vue",
      prefix: "vuepress/",
      collapsable: true,
      children: ["", "page", "markdown", "file", "config", "plugin", "theme"],
    },
    {
      text: "Advanced",
      icon: "advance",
      prefix: "advanced/",
      collapsable: true,
      children: ["component", "style", "replace", "extend"],
    },
  ],
});
