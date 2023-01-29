import { navbar } from "vuepress-theme-hope";
import { version } from "../version";

export const zhNavbar = navbar([
  "/zh/",
  { text: "案例", icon: "discover", link: "/zh/demo/" },
  {
    text: "指南",
    icon: "creative",
    prefix: "/zh/guide/",
    children: [
      {
        text: "Bar",
        icon: "creative",
        prefix: "bar/",
        children: ["baz", { text: "...", icon: "more", link: "" }],
      },
      {
        text: "Foo",
        icon: "config",
        prefix: "foo/",
        children: ["ray", { text: "...", icon: "more", link: "" }],
      },
    ],
  },
  {
    text: version,
    icon: "note",
    children: [
      {
        text: "V2 文档",
        link: "https://theme-hope.vuejs.press/zh/",
      },
      {
        text: "V2 博客演示",
        link: "https://theme-hope-blog-demo.vuejs.press/zh/",
      },
    ],
  },
]);
