import { createRequire } from "node:module";
import { fs, theme } from "docs-shared";

const { version } = fs.readJsonSync(
  createRequire(import.meta.url).resolve(
    "vuepress-plugin-sitemap2/package.json",
  ),
);

// the theme wrapper is located in <root>/docs-shared/src/theme-wrapper.ts
export default theme("sitemap2", {
  locales: {
    "/": {
      navbar: [
        "/",
        "/guide",
        "/config",
        "/demo",
        {
          text: version,
          icon: "bookmark",
          children: [
            {
              text: "V1 Docs",
              link: "https://vuepress-theme-hope.github.io/v1/sitemap/",
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
        "/zh/demo",
        {
          text: version,
          icon: "bookmark",
          children: [
            {
              text: "V1 文档",
              link: "https://vuepress-theme-hope.github.io/v1/sitemap/zh/",
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
