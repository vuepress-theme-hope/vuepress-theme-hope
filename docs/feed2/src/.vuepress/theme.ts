import { createRequire } from "node:module";
import { fs, theme } from "docs-shared";

const { version } = fs.readJsonSync(
  createRequire(import.meta.url).resolve("vuepress-plugin-feed2/package.json"),
);

// the theme wrapper is located in <root>/docs-shared/src/theme-wrapper.ts
export default theme("feed2", {
  locales: {
    "/": {
      navbar: [
        "/",
        "/guide",
        "/config/",
        "/migration",
        "/demo",
        {
          text: version,
          icon: "bookmark",
          children: [
            {
              text: "V1 Docs",
              link: "https://vuepress-theme-hope.github.io/v1/feed/",
            },
          ],
        },
      ],

      sidebar: {
        "/": [
          "",
          "guide",
          {
            text: "Config",
            icon: "gears",
            prefix: "config/",
            collapsible: false,
            children: ["", "channel", "getter", "item"],
          },
          "migration",
          "demo",
        ],
      },
    },

    "/zh/": {
      navbar: [
        "/zh/",
        "/zh/guide",
        "/zh/config/",
        "/zh/migration",
        "/zh/demo",
        {
          text: version,
          icon: "bookmark",
          children: [
            {
              text: "V1 文档",
              link: "https://vuepress-theme-hope.github.io/v1/feed/zh/",
            },
          ],
        },
      ],

      sidebar: {
        "/zh/": [
          "",
          "guide",
          {
            text: "配置",
            icon: "gears",
            prefix: "config/",
            collapsible: false,
            children: ["", "channel", "getter", "item"],
          },
          "migration",
          "demo",
        ],
      },
    },
  },

  plugins: {
    feed: {
      atom: true,
      json: true,
      rss: true,
    },

    mdEnhance: {
      codetabs: true,
      imgMark: true,
    },
  },
});
