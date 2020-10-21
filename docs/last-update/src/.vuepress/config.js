const { config } = require("vuepress-theme-hope");

module.exports = config({
  title: "Last Update Time",
  description: "Last update time getter for vuepress",

  headOption: {
    icon: "/favicon.ico",
    pwa: {
      manifest: "/manifest.json",
      themeColor: "#46bd87",
      appleStatusBarColor: "black",
      appleIcon: "/assets/icon/appleIcon152.png",
      msTileImage: "/assets/icon/msIcon144.png",
      msTileColor: "#ffffff",
    },
  },

  dest: "./dist",

  locales: {
    "/zh/": {
      title: "最后更新时间",
      description: "VuePress 的最后更新时间获取器",
    },
  },

  /** 主题配置 */
  themeConfig: {
    /** 网站的logo */
    logo: "/logo.svg",

    author: "Mr.Hope",
    iconPrefix: "vuepress-",

    footer: {
      display: true,
      copyright: "MIT Licensed | Copyright © 2019-present Mr.Hope",
    },

    mdEnhance: {
      enableAll: true,
    },

    locales: {
      "/zh/": {},
    },

    comment: {
      type: "valine",
      appId: "JGjyHWyyPdU3wFBkM6P1xd51-gzGzoHsz",
      appKey: "dGFcnYzBWRWO5SIRiW2Q9grW",
    },

    pwa: {
      cachePic: true,
      manifest: {
        name: "@mr-hope/vuepress-plugin-last-update",
        short_name: "last-update plugin",
        icons: [
          {
            src: "/assets/icon/chrome-192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
        ],
      },
    },

    hostname: "https://vuepress-last-update.mrhope.site/",

    repo: "https://github.com/mister-hope/vuepress-theme-hope",
    docsDir: "docs/last-update/src",
  },
});
