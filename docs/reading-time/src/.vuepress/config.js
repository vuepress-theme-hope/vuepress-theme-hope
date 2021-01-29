const { config } = require("vuepress-theme-hope");

module.exports = config({
  title: "Reading Time Counter",
  description: "Reading Time Counter for vuepress",

  base: "/reading-time/",
  dest: "./dist",

  locales: {
    "/zh/": {
      title: "阅读时间生成",
      description: "VuePress 的阅读时间生成插件",
    },
  },

  themeConfig: {
    logo: "/logo.svg",
    hostname: "https://vuepress-theme-hope.mrhope.site",

    author: "Mr.Hope",
    iconPrefix: "vuepress-",
    repo: "https://github.com/mister-hope/vuepress-theme-hope",
    docsDir: "docs/reading-time/src",

    locales: {
      "/zh/": {},
    },

    blog: false,

    footer: {
      display: true,
      copyright: "MIT Licensed | Copyright © 2019-present Mr.Hope",
    },

    lastUpdate: {
      timezone: "Asia/Shanghai",
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
        name: "@mr-hope/vuepress-plugin-reading-time",
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
    },
  },
});
