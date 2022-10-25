import { createRequire } from "node:module";
import { fs, pwa, theme } from "docs-shared";

const { version } = fs.readJsonSync(
  createRequire(import.meta.url).resolve("vuepress-plugin-feed2/package.json")
);

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
          icon: "note",
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
            icon: "config",
            prefix: "config/",
            collapsable: false,
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
          icon: "note",
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
            icon: "config",
            prefix: "config/",
            collapsable: false,
            children: ["", "channel", "getter", "item"],
          },
          "migration",
          "demo",
        ],
      },
    },
  },

  plugins: {
    mdEnhance: {
      codetabs: true,
    },

    pwa: pwa({
      name: "vuepress-plugin-feed2",
      shortName: "VuePress2 Feed plugin",
      config: "/config/",
    }),
  },
});
