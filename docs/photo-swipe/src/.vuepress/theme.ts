import { createRequire } from "node:module";
import { fs, theme } from "docs-shared";

const { version } = fs.readJsonSync(
  createRequire(import.meta.url).resolve(
    "vuepress-plugin-photo-swipe/package.json",
  ),
);

// the theme wrapper is located in <root>/docs-shared/src/theme-wrapper.ts
export default theme("photo-swipe", {
  locales: {
    "/": {
      navbar: [
        "/",
        "/guide",
        "/config",
        "/migration",
        "/demo",
        {
          text: version,
          icon: "bookmark",
          children: [
            {
              text: "V1 Docs",
              link: "https://vuepress-theme-hope.github.io/v1/photo-swipe/",
            },
          ],
        },
      ],

      sidebar: false,
    },

    "/zh/": {
      navbar: [
        "/zh/",
        "/zh/guide",
        "/zh/config",
        "/zh/migration",
        "/zh/demo",
        {
          text: version,
          icon: "bookmark",
          children: [
            {
              text: "V1 文档",
              link: "https://vuepress-theme-hope.github.io/v1/photo-swipe/zh/",
            },
          ],
        },
      ],

      sidebar: false,
    },
  },

  plugins: {
    mdEnhance: {
      codetabs: true,
      imgMark: true,
    },
  },
});
