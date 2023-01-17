import { createRequire } from "node:module";
import { fs, navbar } from "docs-shared";

const { version } = fs.readJsonSync(
  createRequire(import.meta.url).resolve(
    "vuepress-plugin-md-enhance/package.json"
  )
);

export const enNavbarConfig = navbar([
  "/",
  "/guide/",
  "/config",
  "/migration",
  "/demo",
  {
    text: version,
    icon: "bookmark",
    children: [
      {
        text: "V1 Docs",
        link: "https://vuepress-theme-hope.github.io/v1/md-enhance/",
      },
    ],
  },
]);

export const zhNavbarConfig = navbar([
  "/zh/",
  "/zh/guide/",
  "/zh/config",
  "/zh/migration",
  "/zh/demo",
  {
    text: version,
    icon: "bookmark",
    children: [
      {
        text: "V1 文档",
        link: "https://vuepress-theme-hope.github.io/v1/md-enhance/zh/",
      },
    ],
  },
]);
