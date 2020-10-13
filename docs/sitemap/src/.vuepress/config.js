const { config } = require("vuepress-theme-hope");

module.exports = config({
  title: "vuepress-plugin-sitemap",
  description: "Sitemap Plugin for vuepress",

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
      title: "Sitemap 生成插件",
      description: "Vuepress 的 Sitemap 生成插件",
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

    hostname: "https://vuepress-sitemap.mrhope.site/",

    repo: "https://github.com/mister-hope/vuepress-theme-hope",
    docsDir: "docs/sitemap/src",
  },
});
