import { version } from "../../../../../lerna.json";
import type { NavbarConfig } from "vuepress-theme-hope";

export const zh: NavbarConfig = [
  { text: "博客主页", link: "/zh/README.md", icon: "home" },
  { text: "项目主页", link: "/zh/home.md", icon: "home" },
  {
    text: "如何使用",
    icon: "creative",
    link: "/zh/guide/README.md",
  },
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
