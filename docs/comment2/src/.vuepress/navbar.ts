import { defineNavbarConfig } from "vuepress-theme-hope";
import { version } from "../../../../lerna.json";

export const enNavbarConfig = defineNavbarConfig([
  "/",
  {
    text: "Guide",
    icon: "creative",
    children: ["/guide/", "/guide/waline"],
  },
  {
    text: "Config",
    icon: "config",
    children: ["/config/", "/config/waline"],
  },
  "/migration",
  {
    text: version,
    icon: "note",
    children: [
      {
        text: "V1 Docs",
        link: "https://vuepress-theme-hope.github.io/v1/comment/",
      },
    ],
  },
]);
export const zhNavbarConfig = defineNavbarConfig([
  "/zh/",
  {
    text: "指南",
    icon: "creative",
    children: ["/zh/guide/", "/zh/guide/waline"],
  },
  {
    text: "配置",
    icon: "config",
    children: ["/zh/config/", "/zh/config/waline"],
  },
  "/migration",
  {
    text: version,
    icon: "note",
    children: [
      {
        text: "V1 文档",
        link: "https://vuepress-theme-hope.github.io/v1/comment/zh/",
      },
    ],
  },
]);
