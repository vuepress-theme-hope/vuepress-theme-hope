import { createRequire } from "node:module";
import { fs, navbar } from "docs-shared";

const { version } = fs.readJsonSync(
  createRequire(import.meta.url).resolve(
    "vuepress-plugin-comment2/package.json",
  ),
);

export const enNavbar = navbar([
  "/",
  {
    text: "Guide",
    icon: "lightbulb",
    prefix: "/guide/",
    children: [
      {
        text: "Guide",
        icon: "lightbulb",
        activeMatch: "^/guide/$",
        link: "",
      },
      "giscus",
      "waline",
      "twikoo",
      "artalk",
    ],
  },
  {
    text: "Config",
    icon: "gears",
    prefix: "/config/",
    children: ["", "giscus", "waline", "twikoo", "artalk"],
  },
  "/migration",
  "/demo",
  {
    text: version,
    icon: "bookmark",
    children: [
      {
        text: "V1 Docs",
        link: "https://vuepress-theme-hope.github.io/v1/comment/",
      },
    ],
  },
]);
export const zhNavbar = navbar([
  "/zh/",
  {
    text: "指南",
    icon: "lightbulb",
    prefix: "/zh/guide/",
    children: [
      {
        text: "指南",
        icon: "lightbulb",
        activeMatch: "^/zh/guide/$",
        link: "",
      },
      "giscus",
      "waline",
      "twikoo",
      "artalk",
    ],
  },
  {
    text: "配置",
    icon: "gears",
    prefix: "/zh/config/",
    children: ["", "giscus", "waline", "twikoo", "artalk"],
  },
  "/zh/migration",
  "/zh/demo",
  {
    text: version,
    icon: "bookmark",
    children: [
      {
        text: "V1 文档",
        link: "https://vuepress-theme-hope.github.io/v1/comment/zh/",
      },
    ],
  },
]);
