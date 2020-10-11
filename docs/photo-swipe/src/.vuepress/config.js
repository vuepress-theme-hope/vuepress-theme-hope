const resolve = require("vuepress-theme-hope/resolve");

module.exports = resolve({
  title: "图片预览插件",
  /** 网站在该语言下的描述 */
  description: "Vuepress 的图片预览插件",

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
    "/en/": {
      title: "Photo swipe Plugin",
      description: "Photo swipe Plugin for Vuepress",
    },
  },

  /** 主题配置 */
  themeConfig: {
    /** 网站的logo */
    logo: "/logo.svg",

    author: "Mr.Hope",
    iconPrefix: "vuepress-",

    nav: [
      { text: "主页", icon: "homefill", link: "/" },
      { text: "配置", icon: "configuration", link: "/config/" },
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
      "/en/": {
        nav: [
          { text: "主页", icon: "homefill", link: "/en/" },
          { text: "配置", icon: "configuration", link: "/en/config/" },
        ],
      },
    },
  },

  hostname: "https://vuepress-photo-swipe.mrhope.site/",

  repo: "https://github.com/mister-hope/vuepress-theme-hope",
  docsDir: "docs/photo-swipe/src",
});
