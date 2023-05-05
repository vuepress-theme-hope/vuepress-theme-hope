import { sidebar } from "docs-shared";

export const enSidebarConfig = sidebar({
  "/": [
    {
      text: "Guide",
      icon: "lightbulb",
      prefix: "guide/",
      children: ["", "giscus", "waline", "artalk", "twikoo"],
    },
    {
      text: "Config",
      icon: "gears",
      prefix: "config/",
      children: ["", "giscus", "waline", "artalk", "twikoo"],
    },
    "migration",
    "demo",
  ],
});

export const zhSidebarConfig = sidebar({
  "/zh/": [
    {
      text: "指南",
      icon: "lightbulb",
      prefix: "guide/",
      children: ["", "giscus", "waline", "artalk", "twikoo"],
    },
    {
      text: "配置",
      icon: "gears",
      prefix: "config/",
      children: ["", "giscus", "waline", "artalk", "twikoo"],
    },
    "migration",
    "demo",
  ],
});
