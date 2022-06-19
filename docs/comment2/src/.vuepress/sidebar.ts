import { sidebar } from "docs-shared";

export const enSidebarConfig = sidebar({
  "/": [
    {
      text: "Guide",
      icon: "creative",
      prefix: "guide/",
      children: ["", "giscus", "waline", "twikoo"],
    },
    {
      text: "Config",
      icon: "config",
      prefix: "config/",
      children: ["", "giscus", "waline", "twikoo"],
    },
    "migration",
    "demo",
  ],
});

export const zhSidebarConfig = sidebar({
  "/zh/": [
    {
      text: "指南",
      icon: "creative",
      prefix: "guide/",
      children: ["", "giscus", "waline", "twikoo"],
    },
    {
      text: "配置",
      icon: "config",
      prefix: "config/",
      children: ["", "giscus", "waline", "twikoo"],
    },
    "migration",
    "demo",
  ],
});
