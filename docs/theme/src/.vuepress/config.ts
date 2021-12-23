import hope from "vuepress-theme-hope";
import navBarConfig from "./navBar";
import sideBarConfig from "./sideBar";

export default hope.config({
  title: "vuepress-theme-hope",
  description: "A vuepress theme with tons of features✨",

  dest: "./dist",

  head: [
    [
      "meta",
      {
        name: "google-site-verification",
        content: "qG3soux9jAKB4Q_DYf7yj1p5cEIuib6yG4zDhpmv2_E",
      },
    ],
  ],

  locales: {
    "/": { lang: "en-US" },
    "/zh/": {
      title: "vuepress-theme-hope",
      description: "一个具有强大功能的 vuepress 主题✨",
    },
  },

  themeConfig: {
    logo: "/logo.svg",
    hostname: "https://vuepress-theme-hope.github.io",

    author: "Mr.Hope",
    repo: "https://github.com/vuepress-theme-hope/vuepress-theme-hope",
    repoDisplay: false,
    docsBranch: "v1",
    docsDir: "docs/theme/src",

    nav: navBarConfig.en,
    sidebar: sideBarConfig.en,

    locales: {
      "/zh/": {
        nav: navBarConfig.zh,
        sidebar: sideBarConfig.zh,
      },
    },

    algolia: {
      apiKey: "6b0dce9b8ac6778738e26c56def7eb76",
      indexName: "vuepress-theme-hope",
    },

    algoliaType: "full",

    footer: {
      display: true,
      copyright: "MIT Licensed | Copyright © 2019-present Mr.Hope",
    },

    comment: {
      type: "waline",
      serverURL: "https://vuepress-theme-hope-comment.vercel.app",
    },

    copyright: {
      status: "local",
    },

    git: {
      timezone: "Asia/Shanghai",
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
    },
  },
});
