import type { NavbarConfig } from "vuepress-theme-hope";

export const zh: NavbarConfig = [
  { text: "博客主页", link: "/zh/readme.md", icon: "home" },
  { text: "项目主页", link: "/zh/home.md", icon: "home" },
  {
    text: "如何使用",
    icon: "creative",
    link: "/zh/guide/readme.md",
  },
  {
    text: "v2.x",
    icon: "note",
    children: [
      {
        text: "v1.x",
        link: "https://vuepress-theme-hope.github.io/zh/",
      },
    ],
  },
];
