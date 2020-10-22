const { config } = require("vuepress-theme-hope");

module.exports = config({
  title: "Markdown Enhance",
  description: "Markdown Enhancement for VuePress",

  dest: "./dist",

  locales: {
    "/zh/": {
      title: "Markdown 增强",
      description: "VuePress 的 Markdown 增强插件",
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
        "presentation",
      ],

      "/": ["", "guide/", "config"],
    },

    author: "Mr.Hope",
    iconPrefix: "vuepress-",

    footer: {
      display: true,
      copyright: "MIT Licensed | Copyright © 2019-present Mr.Hope",
    },

    mdEnhance: {
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
            "presentation",
          ],

          "/zh/": ["", "guide/", "config"],
        },
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
        name: "vuepress-plugin-md-enhance",
        short_name: "md-enhance plugin",
        icons: [
          {
            src: "/assets/icon/chrome-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-mask-192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-mask-512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
        ],
        shortcuts: [
          {
            name: "Guide",
            url: "/guide/",
          },
          {
            name: "Config",
            url: "/config/",
          },
        ],
      },
    },

    hostname: "https://vuepress-md-enhance.mrhope.site/",

    repo: "https://github.com/mister-hope/vuepress-theme-hope/",
    docsDir: "docs/md-enhance/src",
  },
});
