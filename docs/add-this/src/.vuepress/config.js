const resolve = require("vuepress-theme-hope/resolve");

module.exports = resolve({
  title: "vuepress-plugin-add-this",
  description: "AddThis Plugin for vuepress",

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
      title: "AddThis 插件",
      description: "Vuepress 的 AddThis 插件",
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
      {
        text: "Guide",
        icon: "creativefill",
        link: "/guide/",
      },
      {
        text: "Config",
        icon: "configuration",
        link: "/config/",
      },
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
      appId: "EBfvFXOPGWKfEvTXSsw1RnXy-gzGzoHsz",
      appKey: "M8y71yAlPuW2RQJ83r15qfk9",
    },

    locales: {
      "/zh/": {
        nav: [
          { text: "主页", icon: "homefill", link: "/zh/" },
          {
            text: "指南",
            icon: "creativefill",
            link: "/zh/guide/",
          },
          {
            text: "配置",
            icon: "configuration",
            link: "/zh/config/",
          },
        ],
      },
    },

    addthis: "ra-5f829c59e6c6bc9a",
  },

  hostname: "https://vuepress-add-this.mrhope.site/",

  repo: "https://github.com/mister-hope/vuepress-theme-hope",
  docsDir: "docs/add-this/src",
});
