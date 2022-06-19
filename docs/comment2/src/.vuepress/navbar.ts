import { navbar } from "docs-shared";
import { version } from "vuepress-plugin-comment2/package.json";

export const enNavbarConfig = navbar([
  "/",
  {
    text: "Guide",
    icon: "creative",
    prefix: "/guide/",
    children: [
      {
        text: "Guide",
        icon: "creative",
        activeMatch: "^/guide/$",
        link: "",
      },
      "giscus",
      "waline",
      "twikoo",
    ],
  },
  {
    text: "Config",
    icon: "config",
    prefix: "/config/",
    children: ["", "giscus", "waline", "twikoo"],
  },
  "/migration",
  "/demo",
  {
    text: version,
    icon: "note",
    children: [
      {
        text: "V1 Docs",
        link: "https://vuepress-theme-hope.github.io/v1/comment/",
      },
    ],
  },
]);
export const zhNavbarConfig = navbar([
  "/zh/",
  {
    text: "指南",
    icon: "creative",
    prefix: "/zh/guide/",
    children: [
      {
        text: "指南",
        icon: "creative",
        activeMatch: "^/zh/guide/$",
        link: "",
      },
      "giscus",
      "waline",
      "twikoo",
    ],
  },
  {
    text: "配置",
    icon: "config",
    prefix: "/zh/config/",
    children: ["", "giscus", "waline", "twikoo"],
  },
  "/zh/migration",
  "/zh/demo",
  {
    text: version,
    icon: "note",
    children: [
      {
        text: "V1 文档",
        link: "https://vuepress-theme-hope.github.io/v1/comment/zh/",
      },
    ],
  },
]);
