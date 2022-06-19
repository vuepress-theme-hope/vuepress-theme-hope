import { pwa, theme } from "docs-shared";
import { version } from "vuepress-plugin-components/package.json";

export default theme("components", {
  addThis: "ra-5f829c59e6c6bc9a",

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
              link: "https://vuepress-theme-hope.github.io/v1/components/",
            },
          ],
        },
      ],

      sidebar: [
        "/",
        {
          text: "Components",
          prefix: "/guide/",
          children: [
            "addthis",
            "backtotop",
            "badge",
            "codepen",
            "fonticon",
            "pdf",
            "stackblitz",
          ],
        },
        "/config",
      ],
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
              link: "https://vuepress-theme-hope.github.io/v1/components/zh/",
            },
          ],
        },
      ],

      sidebar: [
        "/zh/",
        {
          text: "组件",
          prefix: "/zh/guide/",
          children: [
            "addthis",
            "backtotop",
            "badge",
            "codepen",
            "fonticon",
            "pdf",
            "stackblitz",
          ],
        },
        "/zh/config",
      ],
    },
  },

  plugins: {
    components: ["Badge", "CodePen", "PDF", "StackBlitz", "YouTube"],

    mdEnhance: {
      codetabs: true,
    },

    pwa: pwa({
      name: "vuepress-plugin-components",
      shortName: "VuePress2 Components Lib",
      guide: "/guide/",
    }),
  },
});
