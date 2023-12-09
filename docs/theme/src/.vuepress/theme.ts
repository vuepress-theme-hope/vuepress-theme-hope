import { getDirname, theme, path } from "docs-shared";
import { AVAILABLE_SERVICES } from "vuepress-plugin-components";
import { enNavbarConfig, zhNavbarConfig } from "./navbar/index.js";
import { enSidebarConfig, zhSidebarConfig } from "./sidebar/index.js";

const __dirname = getDirname(import.meta.url);

const IS_NETLIFY = "NETLIFY" in process.env;

// the theme wrapper is located in <root>/docs-shared/src/theme-wrapper.ts
export default theme("theme", {
  repo: "vuepress-theme-hope/vuepress-theme-hope",

  blog: {
    name: "VuePress Theme Hope",
  },

  fullscreen: true,

  navTitle: false,

  extraLocales: {
    Русский: "https://theme-hope-ru.vuejs.press/:route",
  },

  locales: {
    "/": {
      navbar: enNavbarConfig,
      sidebar: enSidebarConfig,
    },
    "/zh/": {
      navbar: zhNavbarConfig,
      sidebar: zhSidebarConfig,
    },
  },

  encrypt: {
    config: {
      "/demo/encrypt.html": "1234",
      "/zh/demo/encrypt.html": "1234",
    },
  },

  plugins: {
    blog: {
      excerptLength: 0,
    },

    components: {
      components: [
        "ArtPlayer",
        "Badge",
        "BiliBili",
        "CodePen",
        "PDF",
        "Replit",
        "Share",
        "SiteInfo",
        "StackBlitz",
        "VPBanner",
        "VPCard",
        "VidStack",
      ],

      componentOptions: {
        pdf: {
          pdfjs: "/assets/lib/pdfjs/",
        },
        share: {
          services: AVAILABLE_SERVICES,
        },
      },

      rootComponents: IS_NETLIFY
        ? {}
        : {
            notice: [
              {
                path: "/",
                title: "New docs location",
                content:
                  "Our docs has moved to a new domain vuejs.press<br>Current docs is built from the latest commit on the main branch, and may contain <strong>unreleased changes</strong>!",
                actions: [
                  {
                    text: "Visit Now",
                    link: "https://theme-hope.vuejs.press",
                  },
                ],
              },
              {
                path: "/zh/",
                title: "新的文档地址",
                content:
                  "我们的文档已经迁移至新域名 vuejs.press 下。<br>当前文档是基于主分支最新提交构建的，可能包含<strong>未发布的更改</strong>。",

                actions: [
                  {
                    text: "立即访问",
                    link: "https://theme-hope.vuejs.press/zh/",
                  },
                ],
              },
            ],
          },
    },

    copyright: {
      license: "MIT",
    },

    feed: {
      atom: true,
      json: true,
      rss: true,
    },

    mdEnhance: {
      alert: true,
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      component: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      imgMark: true,
      imgSize: true,
      include: {
        deep: true,
        resolvePath: (file) => {
          if (file.startsWith("@components/"))
            return file.replace(
              "@components",
              path.resolve(__dirname, "../../../components/src"),
            );

          if (file.startsWith("@echarts/"))
            return file.replace(
              "@echarts",
              path.resolve(__dirname, "../../../md-enhance/src/echarts"),
            );

          if (file.startsWith("@md-enhance/"))
            return file.replace(
              "@md-enhance",
              path.resolve(__dirname, "../../../md-enhance/src"),
            );

          if (file.startsWith("@pwa/"))
            return file.replace(
              "@pwa",
              path.resolve(__dirname, "../../../pwa2/src"),
            );

          return file;
        },
      },
      kotlinPlayground: true,
      mathjax: true,
      mark: true,
      markmap: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue", "unocss"],
      },
      revealJs: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
        themes: [
          "auto",
          "beige",
          "black",
          "blood",
          "league",
          "moon",
          "night",
          "serif",
          "simple",
          "sky",
          "solarized",
          "white",
        ],
      },
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    },
  },
});
