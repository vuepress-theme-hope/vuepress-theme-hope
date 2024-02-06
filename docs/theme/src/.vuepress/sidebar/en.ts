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
    "faq/",
    "migration/",
    "changelog",
    "contribution",
  ],

  "/get-started/": "structure",

  "/guide/": "structure",

  "/config/": "structure",

  "/cookbook/": "structure",

  "/demo/": "structure",

  "/faq/": "structure",

  "/migration/": "structure",
});
// #endregion config
