import { navbar } from "vuepress-theme-hope";
import { version } from "../version.js";

export const zhNavbar = navbar([
  "/zh/",
  "/zh/demo/",
  {
    text: "指南",
    icon: "lightbulb",
    prefix: "/zh/guide/",
    children: [
      {
        text: "Bar",
        icon: "lightbulb",
        prefix: "bar/",
        children: ["baz", { text: "...", icon: "ellipsis", link: "" }],
      },
      {
        text: "Foo",
        icon: "lightbulb",
        prefix: "foo/",
        children: ["ray", { text: "...", icon: "ellipsis", link: "" }],
      },
    ],
  },
  {
    text: version,
    icon: "book",
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
