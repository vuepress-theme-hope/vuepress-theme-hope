import { addViteOptimizeDepsInclude } from "@mr-hope/vuepress-shared";
import { path } from "@vuepress/utils";
import { defineHopeConfig } from "vuepress-theme-hope";

import { enNavbarConfig, zhNavbarConfig } from "./config/navbar";
import { enSidebarConfig, zhSidebarConfig } from "./config/sidebar";

const base = (process.env.BASE as "/" | `/${string}/`) || "/";
const hostname =
  process.env.HOSTNAME || "https://vuepress-theme-hope-v2.netlify.app";

export default defineHopeConfig({
  base,

  dest: "./dist",

  head: [
    [
      "link",
      {
        rel: "stylesheet",
        href: "//at.alicdn.com/t/font_2410206_mfj6e1vbwo.css",
      },
    ],
    [
      "meta",
      {
        name: "google-site-verification",
        content: "qG3soux9jAKB4Q_DYf7yj1p5cEIuib6yG4zDhpmv2_E",
      },
    ],
  ],

  locales: {
    "/": {
      lang: "en-US",
      title: "vuepress-theme-hope",
      description: "A vuepress theme with tons of features✨",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "vuepress-theme-hope",
      description: "一个具有强大功能的 vuepress 主题✨",
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

    docsDir: "docs/theme/src",

    logo: "/logo.svg",

    footer: "MIT Licensed | Copyright © 2019-present Mr.Hope",
    displayFooter: true,

    pageInfo: ["PageView", "Category", "Tag", "ReadingTime"],

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

    plugins: {
      blog: true,

      comment: {
        type: "waline",
        serverURL: "https://vuepress-theme-hope-comment.vercel.app",
      },

      docsearch: {
        appId: "VXIEHELDL1",
        apiKey: "595796f71b6ba14326719682c3738c0c",
        indexName: "vuepress-theme-hope-v2",
      },

      mdEnhance: {
        enableAll: true,
        presentation: {
          plugins: ["highlight", "math", "search", "notes", "zoom"],
        },
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
          shortcuts: [
            {
              name: "Guide",
              short_name: "Guide",
              url: "/guide/",
              icons: [
                {
                  src: "/assets/icon/guide-maskable.png",
                  sizes: "192x192",
                  purpose: "maskable",
                  type: "image/png",
                },
                {
                  src: "/assets/icon/guide-monochrome.png",
                  sizes: "192x192",
                  purpose: "monochrome",
                  type: "image/png",
                },
              ],
            },
            {
              name: "Config",
              short_name: "Config",
              url: "/config/",
              icons: [
                {
                  src: "/assets/icon/config-maskable.png",
                  sizes: "192x192",
                  purpose: "maskable",
                  type: "image/png",
                },
                {
                  src: "/assets/icon/config-monochrome.png",
                  sizes: "192x192",
                  purpose: "monochrome",
                  type: "image/png",
                },
              ],
            },
            {
              name: "Basic",
              short_name: "Basic",
              url: "/basic/",
              icons: [
                {
                  src: "/assets/icon/basic-maskable.png",
                  sizes: "192x192",
                  purpose: "maskable",
                  type: "image/png",
                },
                {
                  src: "/assets/icon/basic-monochrome.png",
                  sizes: "192x192",
                  purpose: "monochrome",
                  type: "image/png",
                },
              ],
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
        "@IconDisplay": path.resolve(__dirname, "./components/IconDisplay"),
        "@KatexPlayground": path.resolve(
          __dirname,
          "./components/KatexPlayground"
        ),
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
          "axios",
          "three",
          "three/examples/jsm/controls/OrbitControls",
          "three/examples/jsm/loaders/STLLoader",
        ]);
      },
    },
  ],
});
