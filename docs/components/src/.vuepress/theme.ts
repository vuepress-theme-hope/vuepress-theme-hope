import { createRequire } from "node:module";
import { fs, pwa, theme } from "docs-shared";

const { version } = fs.readJsonSync(
  createRequire(import.meta.url).resolve(
    "vuepress-plugin-components/package.json"
  )
);

export default theme("components", {
  addThis: "ra-5f829c59e6c6bc9a",

  locales: {
    "/": {
      navbar: [
        "/",
        "/guide/",
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
          icon: "plugin",
          text: "Components",
          prefix: "/guide/",
          children: "structure",
        },
        "/config",
      ],
    },

    "/zh/": {
      navbar: [
        "/zh/",
        "/zh/guide/",
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
          icon: "plugin",
          text: "组件",
          prefix: "/zh/guide/",
          children: "structure",
        },
        "/zh/config",
      ],
    },
  },

  plugins: {
    components: [
      "Badge",
      "BiliBili",
      "CodePen",
      "PDF",
      "StackBlitz",
      "YouTube",
    ],

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
