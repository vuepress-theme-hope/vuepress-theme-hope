import { pwa, theme } from "docs-shared";
import { version } from "vuepress-plugin-reading-time2/package.json";

export default theme("reading-time2", {
  locales: {
    "/": {
      navbar: [
        {
          text: version,
          icon: "note",
          children: [
            {
              text: "V1 Docs",
              link: "https://vuepress-theme-hope.github.io/v1/reading-time/",
            },
          ],
        },
      ],
    },

    "/zh/": {
      navbar: [
        {
          text: version,
          icon: "note",
          children: [
            {
              text: "V1 文档",
              link: "https://vuepress-theme-hope.github.io/v1/reading-time/zh/",
            },
          ],
        },
      ],
    },
  },

  plugins: {
    mdEnhance: {
      codetabs: true,
    },

    pwa: pwa({
      name: "vuepress-plugin-reading-time2",
      shortName: "VuePress2 Reading Time plugin",
      guide: false,
      config: false,
    }),
  },
});
