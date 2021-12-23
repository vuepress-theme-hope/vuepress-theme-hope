import hope from "vuepress-theme-hope";

export default hope.config({
  title: "Reading Time Counter",
  description: "Expect reading time and word count statistics",

  base: "/reading-time/",
  dest: "./dist",

  locales: {
    "/": { lang: "en-US" },
    "/zh/": {
      title: "阅读时间生成",
      description: "预计阅读时间与字数统计生成",
    },
  },

  themeConfig: {
    logo: "/logo.svg",
    hostname: "https://vuepress-theme-hope.github.io",

    author: "Mr.Hope",
    repo: "https://github.com/vuepress-theme-hope/vuepress-theme-hope",
    docsBranch: "v1",
    docsDir: "docs/reading-time/src",

    locales: {
      "/zh/": {},
    },

    blog: false,

    footer: {
      display: true,
      copyright: "MIT Licensed | Copyright © 2019-present Mr.Hope",
    },

    git: {
      timezone: "Asia/Shanghai",
    },

    pwa: {
      favicon: "/reading-time/favicon.ico",
      themeColor: "#46bd87",
      cachePic: true,
      apple: {
        icon: "/reading-time/assets/icon/apple-icon-152.png",
        statusBarColor: "black",
      },
      msTile: {
        image: "/reading-time/assets/icon/ms-icon-144.png",
        color: "#ffffff",
      },
      manifest: {
        name: "@mr-hope/vuepress-plugin-reading-time",
        short_name: "reading-time plugin",
        icons: [
          {
            src: "/reading-time/assets/icon/chrome-mask-512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/reading-time/assets/icon/chrome-mask-192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/reading-time/assets/icon/chrome-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/reading-time/assets/icon/chrome-192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
    },
  },
});
