import { navbar } from "vuepress-theme-hope";
import { version } from "vuepress-theme-hope/package.json";

export const en = navbar([
  "/",
  "/home",
  { text: "Guide", icon: "creative", link: "/guide/" },
  {
    text: "Posts",
    icon: "edit",
    prefix: "/posts/",
    children: [
      {
        text: "Articles 1-4",
        icon: "edit",
        prefix: "article/",
        children: [
          { text: "Article 1", icon: "edit", link: "article1" },
          { text: "Article 2", icon: "edit", link: "article2" },
          "article3",
          "article4",
        ],
      },
      {
        text: "Articles 5-12",
        icon: "edit",
        children: [
          {
            text: "Article 5",
            icon: "edit",
            link: "article/article5",
          },
          {
            text: "Article 6",
            icon: "edit",
            link: "article/article6",
          },
          "article/article7",
          "article/article8",
        ],
      },
      { text: "Article 9", icon: "edit", link: "article9" },
      { text: "Article 10", icon: "edit", link: "article10" },
      "article11",
      "article12",
    ],
  },
  {
    text: version,
    icon: "note",
    children: [
      {
        text: "V2 Docs",
        link: "https://vuepress-theme-hope.github.io/v2/",
      },
      {
        text: "V1 Docs",
        link: "https://vuepress-theme-hope.github.io/v1/",
      },
      {
        text: "V1 Demo",
        link: "https://vuepress-theme-hope.github.io/v1-demo/",
      },
    ],
  },
]);
