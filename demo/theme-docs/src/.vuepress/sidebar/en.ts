import { sidebar } from "vuepress-theme-hope";

export const en = sidebar({
  "/": [
    "",
    "home",
    "slides",
    {
      icon: "creative",
      text: "Guide",
      prefix: "guide/",
      link: "guide/",
      children: "structure",
    },
    {
      text: "Articles",
      icon: "note",
      prefix: "posts/",
      children: [
        {
          text: "Articles 1-4",
          icon: "note",
          collapsable: true,
          prefix: "article/",
          children: ["article1", "article2", "article3", "article4"],
        },
        {
          text: "Articles 5-12",
          icon: "note",
          children: [
            {
              text: "Articles 5-8",
              icon: "note",
              collapsable: true,
              prefix: "article/",
              children: ["article5", "article6", "article7", "article8"],
            },
            {
              text: "Articles 9-12",
              icon: "note",
              children: ["article9", "article10", "article11", "article12"],
            },
          ],
        },
      ],
    },
  ],
});
