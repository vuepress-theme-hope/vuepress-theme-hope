import { createRequire } from "node:module";
import { fs, theme } from "docs-shared";

const { version } = fs.readJsonSync(
  createRequire(import.meta.url).resolve(
    "vuepress-plugin-components/package.json",
  ),
);

const IS_NETLIFY = "NETLIFY" in process.env;

// the theme wrapper is located in <root>/docs-shared/src/theme-wrapper.ts
export default theme("components", {
  locales: {
    "/": {
      navbar: [
        "/",
        "/guide/",
        "/config",
        "/demo",
        {
          text: version,
          icon: "bookmark",
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
          icon: "puzzle-piece",
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
          icon: "bookmark",
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
          icon: "puzzle-piece",
          text: "组件",
          prefix: "/zh/guide/",
          children: "structure",
        },
        "/zh/config",
      ],
    },
  },

  plugins: {
    components: {
      components: [
        "ArtPlayer",
        "AudioPlayer",
        "Badge",
        "BiliBili",
        "CodePen",
        "PDF",
        "Replit",
        "Share",
        "SiteInfo",
        "StackBlitz",
        // "VidStack",
        "VideoPlayer",
        "XiGua",
        "YouTube",
      ],

      componentOptions: {
        pdf: {
          pdfjs: "/assets/lib/pdfjs/",
        },
      },

      rootComponents: {
        addThis: "ra-5f829c59e6c6bc9a",
        ...(IS_NETLIFY
          ? {}
          : {
              notice: [
                {
                  path: "/",
                  title: "New docs location",
                  content: "Our docs has moved to a new domain vuejs.press",
                  actions: [
                    {
                      text: "Visit Now",
                      link: "https://plugin-components.vuejs.press",
                    },
                  ],
                },
                {
                  path: "/zh/",
                  title: "新的文档地址",
                  content: "我们的文档已经迁移至新域名 vuejs.press 下。",
                  actions: [
                    {
                      text: "立即访问",
                      link: "https://plugin-components.vuejs.press/zh/",
                    },
                  ],
                },
              ],
            }),
      },
    },

    mdEnhance: {
      codetabs: true,
      imgMark: true,
      include: true,
    },
  },
});
