import { defineSidebarConfig } from "vuepress-theme-hope";

export const enSidebarConfig = defineSidebarConfig({
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
  ],
});

export const zhSidebarConfig = defineSidebarConfig({
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
  ],
});
