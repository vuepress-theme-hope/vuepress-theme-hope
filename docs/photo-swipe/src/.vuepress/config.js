const { config } = require("vuepress-theme-hope");

module.exports = config({
  title: "Photo swipe Plugin",
  description: "Photo swipe Plugin for Vuepress",

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
      title: "图片预览插件",
      description: "Vuepress 的图片预览插件",
    },
  },

  /** 主题配置 */
  themeConfig: {
    /** 网站的logo */
    logo: "/logo.svg",

    author: "Mr.Hope",
    iconPrefix: "vuepress-",

    nav: [
      { text: "Home", icon: "homefill", link: "/" },
      { text: "Demo", icon: "creativefill", link: "/demo/" },
      { text: "Config", icon: "configuration", link: "/config/" },
    ],

    footer: {
      display: true,
      copyright: "MIT Licensed | Copyright © 2019-present Mr.Hope",
    },

    markdown: {
      enableAll: true,
    },

    comment: {
      type: "valine",
      appId: "xouo0O4gVnPMvGC5Kn5CAi26-gzGzoHsz",
      appKey: "T4CQVlS8wsnQkvXNX2T9wduv",
    },

    locales: {
      "/zh/": {
        nav: [
          { text: "主页", icon: "homefill", link: "/zh/" },
          { text: "演示", icon: "creativefill", link: "/zh/demo/" },
          { text: "配置", icon: "configuration", link: "/zh/config/" },
        ],
      },
    },

    hostname: "https://vuepress-photo-swipe.mrhope.site/",

    repo: "https://github.com/mister-hope/vuepress-theme-hope",
    docsDir: "docs/photo-swipe/src",
  },
});
