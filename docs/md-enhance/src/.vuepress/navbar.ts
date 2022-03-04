import { defineNavbarConfig } from "vuepress-theme-hope";
import { version } from "../../../../lerna.json";

export const enNavbarConfig = defineNavbarConfig([
  "/",
  "/guide/",
  "/config",
  "/migration",
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
