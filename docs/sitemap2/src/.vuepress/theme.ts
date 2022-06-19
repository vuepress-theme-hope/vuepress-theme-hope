import { pwa, theme } from "docs-shared";
import { version } from "vuepress-plugin-sitemap2/package.json";

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
          icon: "note",
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
          icon: "note",
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
    },

    pwa: pwa({
      name: "vuepress-plugin-sitemap2",
      shortName: "VuePress2 Sitemap plugin",
      guide: "/guide/",
    }),
  },
});
