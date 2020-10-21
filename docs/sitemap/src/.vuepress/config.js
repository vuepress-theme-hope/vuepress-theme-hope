const { config } = require("vuepress-theme-hope");

module.exports = config({
  title: "Sitemap Generator",
  description: "Generate Sitemap for your site",

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

  dest: "./dist",

  locales: {
    "/zh/": {
      title: "Sitemap 生成器",
      description: "为你的站点生成 Sitemap",
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

    mdEnhance: {
      enableAll: true,
    },

    pwa: {
      cachePic: true,
      manifest: {
        name: "@mr-hope/vuepress-plugin-sitemap",
        short_name: "sitemap plugin",
        icons: [
          {
            src: "/assets/icon/chrome-192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
        ],
      },
    },

    locales: {
      "/zh/": {},
    },

    hostname: "https://vuepress-sitemap.mrhope.site/",

    repo: "https://github.com/mister-hope/vuepress-theme-hope",
    docsDir: "docs/sitemap/src",
  },
});
