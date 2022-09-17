import { navbar } from "vuepress-theme-hope";
import { version } from "../version";

export const zhNavbar = navbar([
  "/zh/",
  { text: "演示", icon: "discover", link: "/zh/demo/" },
  {
    text: "博文",
    icon: "edit",
    prefix: "/zh/posts/",
    children: [
      {
        text: "苹果",
        icon: "edit",
        prefix: "apple/",
        children: [
          { text: "苹果1", icon: "edit", link: "1" },
          { text: "苹果2", icon: "edit", link: "2" },
          "3",
          "4",
        ],
      },
      {
        text: "香蕉",
        icon: "edit",
        prefix: "banana/",
        children: [
          {
            text: "香蕉 1",
            icon: "edit",
            link: "1",
          },
          {
            text: "香蕉 2",
            icon: "edit",
            link: "2",
          },
          "3",
          "4",
        ],
      },
      { text: "樱桃", icon: "edit", link: "cherry" },
      { text: "火龙果", icon: "edit", link: "dragonfruit" },
      "tomato",
      "strawberry",
    ],
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
        text: "V2 文档案例o",
        link: "https://vuepress-theme-hope.github.io/docs-demo/zh/",
      },
      {
        text: "V1 文档",
        link: "https://vuepress-theme-hope.github.io/v1/zh/",
      },
      {
        text: "V1 演示",
        link: "https://vuepress-theme-hope.github.io/v1-demo/zh/",
      },
    ],
  },
]);
