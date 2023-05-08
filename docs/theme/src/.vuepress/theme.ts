import { getDirname, theme, path } from "docs-shared";
import { enNavbarConfig, zhNavbarConfig } from "./navbar/index.js";
import { enSidebarConfig, zhSidebarConfig } from "./sidebar/index.js";

const __dirname = getDirname(import.meta.url);

const IS_NETLIFY = "NETLIFY" in process.env;

export default theme("theme", {
  repo: "vuepress-theme-hope/vuepress-theme-hope",

  blog: {
    name: "VuePress Theme Hope",
  },

  fullscreen: true,

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
        "AudioPlayer",
        "Badge",
        "BiliBili",
        "CodePen",
        "PDF",
        "Replit",
        "SiteInfo",
        "StackBlitz",
        "VideoPlayer",
        "YouTube",
      ],

      componentOptions: {
        pdf: {
          pdfjs: "/assets/lib/pdfjs/",
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

    copyright: true,

    feed: {
      atom: true,
      json: true,
      rss: true,
    },

    mdEnhance: {
      align: true,
      attrs: true,
      card: true,
      chart: true,
      codetabs: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      imgMark: true,
      imgSize: true,
      include: {
        resolvePath: (file, cwd) => {
          if (file.startsWith("@echarts"))
            return file.replace(
              "@echarts",
              path.resolve(__dirname, "../echarts")
            );

          return file;
        },
      },
      mathjax: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue"],
      },
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
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
