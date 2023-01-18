import { sidebar } from "docs-shared";

export const ruSidebarConfig = sidebar({
  "/ru/": [
    "",
    {
      text: "Руководство",
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
      text: "Конфиг",
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
      text: "Учебник с примерами",
      icon: "signs-post",
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
      icon: "code-compare",
      prefix: "migration/",
      children: ["highlight", "config", "page", "style"],
    },
    {
      text: "Часто задаваемые вопросы",
      icon: "circle-question",
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
