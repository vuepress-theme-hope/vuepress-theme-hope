import { createRequire } from "node:module";
import { fs, pwa, theme } from "docs-shared";

const { version } = fs.readJsonSync(
  createRequire(import.meta.url).resolve(
    "vuepress-plugin-reading-seo2/package.json"
  )
);

export default theme("seo2", {
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
          icon: "note",
          children: [
            {
              text: "V1 Docs",
              link: "https://vuepress-theme-hope.github.io/v1/seo/",
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
          icon: "note",
          children: [
            {
              text: "V1 文档",
              link: "https://vuepress-theme-hope.github.io/v1/seo/zh/",
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
    },

    pwa: pwa({
      name: "vuepress-plugin-seo2",
      shortName: "VuePress2 SEO plugin",
      guide: "/guide/",
    }),
  },
});
