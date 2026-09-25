import { navbar } from "@docs/shared";

export const enNavbar = navbar([
  "/",
  {
    text: "Guide",
    prefix: "/guide/",
    icon: "lightbulb",
    children: ["", "code/"],
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
    children: ["", "code/"],
  },
  "/zh/config",
  "/zh/demo",
]);
