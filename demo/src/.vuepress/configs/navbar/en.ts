import { version } from "../../../../../lerna.json";
import type { NavbarConfig } from "vuepress-theme-hope";
export const en: NavbarConfig = [
  { text: "Blog Home", link: "/README.md", icon: "home" },
  { text: "Project Home", link: "/home.md", icon: "home" },
  {
    text: "Guide",
    icon: "creative",
    link: "/guide/README.md",
  },
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
