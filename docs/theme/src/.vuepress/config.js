const { config } = require("vuepress-theme-hope");
const navBarConfig = require("./navBar");
const sideBarConfig = require("./sideBar");

module.exports = config({
  title: "vuepress-theme-hope",
  description: "A vuepress theme with tons of features✨",

  headOption: {
    icon: "/favicon.ico",
    pwa: {
      manifest: "/manifest.json",
      themeColor: "#46bd87",
      appleStatusBarColor: "black",
      appleIcon: "/assets/icon/apple-icon-152.png",
      msTileImage: "/assets/icon/ms-icon-144.png",
      msTileColor: "#ffffff",
    },
  },

  dest: "./dist",

  extraWatchFiles: [".vuepress/navBar.js", ".vuepress/sideBar.js"],

  locales: {
    "/zh/": {
      title: "vuepress-theme-hope",
      description: "一个具有强大功能的 vuepress 主题✨",
    },
  },

  themeConfig: {
    logo: "/logo.svg",
    nav: navBarConfig.en,
    sidebar: sideBarConfig.en,
    author: "Mr.Hope",
    iconPrefix: "vuepress-",

    locales: {
      "/zh/": {
        nav: navBarConfig.zh,
        sidebar: sideBarConfig.zh,
      },
    },

    mdEnhance: {
      enableAll: true,
    },

    comment: {
      type: "valine",
      appId: "2vSLKb0SqFKKWEgrOPGy3sp1-gzGzoHsz",
      appKey: "vma8Ewk61WeNkI81O3CGpT2i",
    },

    footer: {
      display: true,
      copyright: "MIT Licensed | Copyright © 2019-present Mr.Hope",
    },

    pwa: {
      cachePic: true,
      manifest: {
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
          {
            name: "Basic",
            url: "/basic/",
          },
        ],
      },
    },

    algolia: {
      apiKey: "4deb442097fb6a05638adf10ef86e222",
      indexName: "mrhope_vuepress-theme",
    },

    hostname: "https://vuepress-theme.mrhope.site/",

    repo: "https://github.com/mister-hope/vuepress-theme-hope",
    repoDisplay: false,
    docsDir: "docs/theme/src",
  },
});
