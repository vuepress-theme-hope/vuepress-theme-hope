import { createRequire } from "node:module";

import { navbar } from "docs-shared";
import { fs } from "vuepress/utils";

const { version } = fs.readJsonSync(
  createRequire(import.meta.url).resolve(
    "vuepress-plugin-md-enhance/package.json",
  ),
) as { version: string };

export const enNavbar = navbar([
  "/",
  {
    text: "Guide",
    prefix: "/guide/",
    icon: "lightbulb",
    children: [
      "",
      "grammar/",
      "content/",
      "stylize/",
      "chart/",
      "code/",
      "others",
    ],
  },
  "/config",
  "/demo",
]);

export const zhNavbar = navbar([
  "/zh/",
  {
    text: "指南",
    prefix: "/zh/guide/",
    icon: "lightbulb",
    children: [
      "",
      "grammar/",
      "content/",
      "stylize/",
      "chart/",
      "code/",
      "others",
    ],
  },
  "/zh/config",
  "/zh/demo",
  {
    text: version,
    icon: "bookmark",
    children: [
      "/zh/migration",
      {
        text: "V1 文档",
        link: "https://vuepress-theme-hope.github.io/v1/md-enhance/zh/",
      },
    ],
  },
]);
