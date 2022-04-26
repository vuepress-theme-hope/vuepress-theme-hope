import { defineNavbarConfig } from "vuepress-theme-hope";
import { version } from "vuepress-plugin-md-enhance/package.json";

export const enNavbarConfig = defineNavbarConfig([
  "/",
  "/guide/",
  "/config",
  "/migration",
  "/demo",
  {
    text: version,
    icon: "note",
    children: [
      {
        text: "V1 Docs",
        link: "https://vuepress-theme-hope.github.io/v1/md-enhance/",
      },
    ],
  },
]);

export const zhNavbarConfig = defineNavbarConfig([
  "/zh/",
  "/zh/guide/",
  "/zh/config",
  "/zh/migration",
  "/zh/demo",
  {
    text: version,
    icon: "note",
    children: [
      {
        text: "V1 文档",
        link: "https://vuepress-theme-hope.github.io/v1/md-enhance/zh/",
      },
    ],
  },
]);
