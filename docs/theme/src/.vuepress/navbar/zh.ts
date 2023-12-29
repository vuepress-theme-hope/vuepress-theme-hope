import { navbar } from "docs-shared";

// region config
export const zhNavbarConfig = navbar([
  "/zh/get-started/",
  "/zh/guide/",
  "/zh/config/",
  "/zh/faq/",
  "/zh/demo/",
  {
    text: "项目",
    icon: "circle-info",
    prefix: "/zh/",
    children: [
      {
        text: "教程",
        icon: "signs-post",
        prefix: "cookbook/",
        children: ["markdown/", "vuepress/"],
      },
      {
        text: "项目",
        children: ["changelog", "migration/", "related", "contribution"],
      },
    ],
  },
]);
// #endregion config
