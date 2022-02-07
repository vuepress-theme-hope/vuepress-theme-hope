import { version } from "../../../../../lerna.json";
import type { HopeThemeNavbarConfig } from "vuepress-theme-hope";

export const zh: HopeThemeNavbarConfig = [
  "/zh/README.md",
  "/zh/home.md",
  "/zh/guide/README.md",
  {
    text: version,
    icon: "note",
    children: [
      {
        text: "V2 Docs",
        link: "https://vuepress-theme-hope.github.io/v2/",
      },
      {
        text: "V1 Docs",
        link: "https://vuepress-theme-hope.github.io",
      },
      {
        text: "V1 Demo",
        link: "https://vuepress-theme-hope.github.io/v1-demo/",
      },
    ],
  },
];
