const resolve = require("vuepress-theme-hope/resolve");
const navBarConfig = require("./navBar");
const sideBarConfig = require("./sideBar");

module.exports = resolve({
  title: "vuepress-theme-hope",
  description: "一个轻量的 vuepress 主题",

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

  extraWatchFiles: [".vuepress/navBar.js", ".vuepress/sideBar.js"],

  locales: {
    "/en/": {
      title: "vuepress-theme-hope",
      description: "A light vuepress theme",
    },
  },

  themeConfig: {
    logo: "/logo.svg",
    nav: navBarConfig.zh,
    sidebar: sideBarConfig.zh,
    author: "Mr.Hope",
    iconPrefix: "vuepress-",

    locales: {
      "/en/": {
        nav: navBarConfig.en,
        sidebar: sideBarConfig.en,
      },
    },

    markdown: {
      enableAll: true,
    },
    comment: {
      type: "valine",
      appId: "ENQC8OAX6E76OUB07ODFfUHm-gzGzoHsz",
      appKey: "2JK4ezJDqxPTF7JLn5Wk6i8y",
    },

    footer: {
      copyright: "MIT Licensed | Copyright © 2019-present Mr.Hope",
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
