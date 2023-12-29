import { navbar } from "docs-shared";

// region config
export const enNavbarConfig = navbar([
  "/get-started/",
  "/guide/",
  "/config/",
  "/faq/",
  "/demo/",
  {
    text: "Others",
    icon: "circle-info",
    children: [
      {
        text: "Cookbook",
        prefix: "/cookbook/",
        children: ["markdown/", "vuepress/"],
      },
      {
        text: "Project",
        children: ["/changelog", "/migration/", "/related", "/contribution"],
      },
    ],
  },
]);
// #endregion config
