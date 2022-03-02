import { addViteOptimizeDepsInclude } from "@mr-hope/vuepress-shared";
import { path } from "@vuepress/utils";
import { defineHopeConfig } from "vuepress-theme-hope";
import { version } from "../../../../lerna.json";

const base = process.env.BASE || "/";
const hostname =
  process.env.HOSTNAME || "https://vuepress-theme-hope-v2.netlify.app";

export default defineHopeConfig({
  base: `/${base.replace(/^\//, "")}reading-time/`,

  dest: "./dist",

  head: [
    [
      "link",
      {
        rel: "stylesheet",
        href: "//at.alicdn.com/t/font_2410206_mfj6e1vbwo.css",
      },
    ],
  ],

  locales: {
    "/": {
      lang: "en-US",
      title: "Reading Time Counter",
      description: "Expect reading time and word count statistics",
    },

    "/zh/": {
      lang: "zh-CN",
      title: "阅读时间生成",
      description: "预计阅读时间与字数统计生成",
    },
  },

  theme: "hope",

  themeConfig: {
    hostname,

    author: {
      name: "Mr.Hope",
      url: "https://mrhope.site",
    },

    iconPrefix: "iconfont icon-",

    repo: "https://github.com/vuepress-theme-hope/vuepress-theme-hope",

    docsDir: "docs/reading-time2/src",

    logo: "/logo.svg",

    footer: "MIT Licensed | Copyright © 2019-present Mr.Hope",
    displayFooter: true,

    pageInfo: ["PageView", "Category", "Tag", "ReadingTime"],

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
        codegroup: true,
      },

      pwa: {
        favicon: "/favicon.ico",
        themeColor: "#46bd87",
        cachePic: true,
        apple: {
          icon: "/assets/icon/apple-icon-152.png",
          statusBarColor: "black",
        },
        msTile: {
          image: "/assets/icon/ms-icon-144.png",
          color: "#ffffff",
        },
        manifest: {
          name: "vuepress-plugin-reading-time2",
          short_name: "reading-time plugin",
          icons: [
            {
              src: "/assets/icon/chrome-mask-512.png",
              sizes: "512x512",
              purpose: "maskable",
              type: "image/png",
            },
            {
              src: "/assets/icon/chrome-mask-192.png",
              sizes: "192x192",
              purpose: "maskable",
              type: "image/png",
            },
            {
              src: "/assets/icon/chrome-512.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "/assets/icon/chrome-192.png",
              sizes: "192x192",
              type: "image/png",
            },
          ],
        },
        appendBase: true,
      },
    },
  },

  plugins: [
    {
      name: "theme-enhance",
      alias: {
        "@theme-hope/components/HomeHero": path.resolve(
          __dirname,
          "./components/HopeHero"
        ),
      },
      onInitialized: (app) => {
        if (app.env.isDev)
          addViteOptimizeDepsInclude(app, [
            "@mr-hope/vuepress-shared/lib/client",
            "dayjs",
            "dayjs/plugin/localizedFormat",
            "dayjs/plugin/objectSupport",
            "dayjs/plugin/timezone",
            "dayjs/plugin/utc",
          ]);

        addViteOptimizeDepsInclude(app, [
          "three",
          "three/examples/jsm/controls/OrbitControls",
          "three/examples/jsm/loaders/STLLoader",
        ]);
      },
    },
  ],
});
