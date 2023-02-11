import { theme } from "docs-shared";
import {
  enNavbarConfig,
  zhNavbarConfig,
  ruNavbarConfig,
} from "./navbar/index.js";
import {
  enSidebarConfig,
  zhSidebarConfig,
  ruSidebarConfig,
} from "./sidebar/index.js";

const IS_NETLIFY = "NETLIFY" in process.env;

export default theme("theme", {
  repo: "vuepress-theme-hope/vuepress-theme-hope",

  blog: {
    name: "VuePress Theme Hope",
  },

  themeColor: {
    blue: "#2196f3",
    red: "#f26d6d",
    green: "#3eaf7c",
    orange: "#fb9b5f",
  },

  fullscreen: true,

  locales: {
    "/": {
      navbar: enNavbarConfig,
      sidebar: enSidebarConfig,
    },
    "/zh/": {
      navbar: zhNavbarConfig,
      sidebar: zhSidebarConfig,
    },
    "/ru/": {
      navbar: ruNavbarConfig,
      sidebar: ruSidebarConfig,
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
              {
                path: "/ru/",
                title: "Новое местоположение документации",
                content:
                  "Наша документация переехала на новый домен vuejs.press<br>Текущая документация построена на основе последнего коммита в главной ветке и может содержать <strong>неопубликованные изменения</strong>!",
                actions: [
                  {
                    text: "Посетите сейчас",
                    link: "https://theme-hope.vuejs.press/ru/",
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
      chart: true,
      codetabs: true,
      container: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      imgMark: true,
      imgSize: true,
      include: true,
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
