import { navbar } from "docs-shared";
import pkg from "vuepress-plugin-md-enhance/package.json" with { type: "json" };

export const enNavbar = navbar([
  "/",
  {
    text: "Guide",
    prefix: "/guide/",
    icon: "lightbulb",
    children: ["", "chart/", "code/"],
  },
  "/config",
  "/demo",
  {
    text: pkg.version,
    icon: "bookmark",
    link: "",
  },
]);

export const zhNavbar = navbar([
  "/zh/",
  {
    text: "指南",
    prefix: "/zh/guide/",
    icon: "lightbulb",
    children: ["", "chart/", "code/"],
  },
  "/zh/config",
  "/zh/demo",
  {
    text: pkg.version,
    icon: "bookmark",
    link: "",
  },
]);
