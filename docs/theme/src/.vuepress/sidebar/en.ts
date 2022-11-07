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
      children: ["tutorial/", "markdown/", "vuepress/", "advanced/"],
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

  "/cookbook/": [
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
      children: ["", "page", "markdown", "file", "config", "plugin", "theme"],
    },
    {
      text: "Advanced",
      icon: "advance",
      prefix: "advanced/",
      collapsible: true,
      children: ["component", "style", "replace", "extend"],
    },
  ],
});
