import { addViteOptimizeDeps } from "@mr-hope/vuepress-shared";
import { path } from "@vuepress/utils";
import { defineHopeConfig } from "vuepress-theme-hope";

import { enNavbarConfig, zhNavbarConfig } from "./config/navbar";
import { enSidebarConfig, zhSidebarConfig } from "./config/sidebar";

export default defineHopeConfig({
  base: "/v2/",

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
    hostname: "https://vuepress-theme-hope.github.io",

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

      mdEnhance: {
        enableAll: true,
        presentation: {
          plugins: ["highlight", "math", "search", "notes", "zoom"],
        },
      },

      pwa: {
        favicon: "/v2/favicon.ico",
        themeColor: "#46bd87",
        cachePic: true,
        apple: {
          icon: "/v2/assets/icon/apple-icon-152.png",
          statusBarColor: "black",
        },
        msTile: {
          image: "/v2/assets/icon/ms-icon-144.png",
          color: "#ffffff",
        },
        manifest: {
          icons: [
            {
              src: "/v2/assets/icon/chrome-mask-512.png",
              sizes: "512x512",
              purpose: "maskable",
              type: "image/png",
            },
            {
              src: "/v2/assets/icon/chrome-mask-192.png",
              sizes: "192x192",
              purpose: "maskable",
              type: "image/png",
            },
            {
              src: "/v2/assets/icon/chrome-512.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "/v2/assets/icon/chrome-192.png",
              sizes: "192x192",
              type: "image/png",
            },
          ],
          shortcuts: [
            {
              name: "Guide",
              short_name: "Guide",
              url: "/v2/guide/",
              icons: [
                {
                  src: "/v2/assets/icon/guide-maskable.png",
                  sizes: "192x192",
                  purpose: "maskable",
                  type: "image/png",
                },
                {
                  src: "/v2/assets/icon/guide-monochrome.png",
                  sizes: "192x192",
                  purpose: "monochrome",
                  type: "image/png",
                },
              ],
            },
            {
              name: "Config",
              short_name: "Config",
              url: "/v2/config/",
              icons: [
                {
                  src: "/v2/assets/icon/config-maskable.png",
                  sizes: "192x192",
                  purpose: "maskable",
                  type: "image/png",
                },
                {
                  src: "/v2/assets/icon/config-monochrome.png",
                  sizes: "192x192",
                  purpose: "monochrome",
                  type: "image/png",
                },
              ],
            },
            {
              name: "Basic",
              short_name: "Basic",
              url: "/v2/basic/",
              icons: [
                {
                  src: "/v2/assets/icon/basic-maskable.png",
                  sizes: "192x192",
                  purpose: "maskable",
                  type: "image/png",
                },
                {
                  src: "/v2/assets/icon/basic-monochrome.png",
                  sizes: "192x192",
                  purpose: "monochrome",
                  type: "image/png",
                },
              ],
            },
          ],
        },
      },
    },
  },

  plugins: [
    [
      "@vuepress/docsearch",
      {
        appId: "VXIEHELDL1",
        apiKey: "595796f71b6ba14326719682c3738c0c",
        indexName: "vuepress-theme-hope-v2",
      },
    ],
    [
      "@vuepress/plugin-register-components",
      {
        components: {
          IconDisplay: path.resolve(__dirname, "./components/IconDisplay"),
          KatexPlayground: path.resolve(
            __dirname,
            "./components/KatexPlayground"
          ),
        },
      },
    ],
    (_options, app) => {
      addViteOptimizeDeps(app, [
        "three",
        "three/examples/jsm/controls/OrbitControls",
        "three/examples/jsm/loaders/STLLoader",
      ]);

      return {
        name: "theme-enhance",
        alias: {
          "@theme-hope/components/HomeHero": path.resolve(
            __dirname,
            "./components/HopeHero"
          ),
        },
      };
    },
  ],
});
