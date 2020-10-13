const resolve = require("vuepress-theme-hope/resolve");

module.exports = resolve({
  title: "Markdown Enhance Plugin",
  description: "Markdown Enhancement for Vuepress",

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
      title: "Markdown 增强",
      description: "Vuepress 的 Markdown 增强插件",
    },
  },

  themeConfig: {
    logo: "/logo.svg",

    nav: [
      { text: "Home", icon: "homefill", link: "/" },
      { text: "Guide", icon: "creativefill", link: "/guide/" },
      { text: "Config", icon: "configuration", link: "/config/" },
    ],
    sidebar: {
      "/guide/": [
        "",
        "sup-sub",
        "align",
        "footnote",
        "mark",
        "flowchart",
        "tex",
      ],

      "/": ["", "guide/", "config"],
    },

    author: "Mr.Hope",
    iconPrefix: "vuepress-",

    footer: {
      display: true,
      copyright: "MIT Licensed | Copyright © 2019-present Mr.Hope",
    },

    markdown: {
      enableAll: true,
    },

    comment: {
      type: "valine",
      appId: "YwtJvkJgikEDUjCFtygBQDwu-gzGzoHsz",
      appKey: "BHsA7vE2TVwHAVELEpherqh4",
    },

    locales: {
      "/zh/": {
        nav: [
          { text: "主页", icon: "homefill", link: "/zh/" },
          { text: "指南", icon: "creativefill", link: "/zh/guide/" },
          { text: "配置", icon: "configuration", link: "/zh/config/" },
        ],
        sidebar: {
          "/zh/guide/": [
            "",
            "sup-sub",
            "align",
            "footnote",
            "mark",
            "flowchart",
            "tex",
          ],

          "/zh/": ["", "guide/", "config"],
        },
      },
    },

    hostname: "https://vuepress-md-enhance.mrhope.site/",

    repo: "https://github.com/mister-hope/vuepress-theme-hope/",
    docsDir: "docs/md-enhance/src",
  },
});
