const { config } = require("vuepress-theme-hope");

module.exports = config({
  title: "@mr-hope/last-update",
  description: "Last update plugin for vuepress",

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

  temp: "./node_modules/.temp",
  dest: "./dist",

  locales: {
    "/zh/": {
      title: "最后更新时间插件",
      description: "Vuepress 的最后更新时间插件",
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

    markdown: {
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

    hostname: "https://vuepress-last-update.mrhope.site/",

    repo: "https://github.com/mister-hope/vuepress-theme-hope",
    docsDir: "docs/last-update/src",
  },
});
