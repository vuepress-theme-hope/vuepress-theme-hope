import { defineSidebarConfig } from "vuepress-theme-hope";

export const enSidebarConfig = defineSidebarConfig({
  "/": [
    {
      text: "Guide",
      icon: "creative",
      children: ["guide/", "guide/waline"],
    },
    {
      text: "Config",
      icon: "config",
      children: ["config/", "config/waline"],
    },
    "migration",
  ],
});

export const zhSidebarConfig = defineSidebarConfig({
  "/zh/": [
    {
      text: "指南",
      icon: "creative",
      children: ["guide/", "guide/waline"],
    },
    {
      text: "配置",
      icon: "config",
      children: ["config/", "config/waline"],
    },
    "migration",
  ],
});
