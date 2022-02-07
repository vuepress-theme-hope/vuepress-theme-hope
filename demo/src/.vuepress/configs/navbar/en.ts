import { version } from "../../../../../lerna.json";
import type { HopeThemeNavbarConfig } from "vuepress-theme-hope";

export const en: HopeThemeNavbarConfig = [
  "/README.md",
  "/home.md",
  "/guide/README.md",
  {
    text: version,
    icon: "note",
    children: [
      {
        text: "V2 文档",
        link: "https://vuepress-theme-hope.github.io/v2/zh/",
      },
      {
        text: "V1 文档",
        link: "https://vuepress-theme-hope.github.iozh/",
      },
      {
        text: "V1 演示",
        link: "https://vuepress-theme-hope.github.io/v1-demo/zh/",
      },
    ],
  },
];
