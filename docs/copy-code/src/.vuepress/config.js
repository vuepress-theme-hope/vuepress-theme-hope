const { config } = require("vuepress-theme-hope");

module.exports = config({
  title: "vuepress-plugin-copy-code",
  description: "Copy Code Plugin for vuepress",

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
      title: "代码一键复制插件",
      description: "Vuepress 的代码一键复制插件",
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
      appId: "AOUpdmlh8YrLcu7lhMAnm4zN-gzGzoHsz",
      appKey: "eT8UQNRrAbur6O0fcf68Rg83",
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

    hostname: "https://vuepress-copy-code.mrhope.site/",

    repo: "https://github.com/mister-hope/vuepress-theme-hope",
    docsDir: "docs/copy-code/src",
  },
});
