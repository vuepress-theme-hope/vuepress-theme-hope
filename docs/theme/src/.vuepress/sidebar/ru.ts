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
      text: "Учебник с примерами",
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

  "/ru/cookbook/": "structure",
});
