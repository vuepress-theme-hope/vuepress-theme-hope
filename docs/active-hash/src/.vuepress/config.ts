import hope from "vuepress-theme-hope";

export default hope.config({
  title: "Git-based info plugin",
  description: "Info plugin based on active-hash for vuepress",

  base: "/active-hash/",
  dest: "./dist",

  locales: {
    "/": { lang: "en-US" },
    "/zh/": {
      title: "Hash 激活插件",
      description: "自动激活对应 Hash",
    },
  },
  themeConfig: {
    logo: "/logo.svg",
    hostname: "https://vuepress-theme-hope.github.io",

    author: "Mr.Hope",
    repo: "https://github.com/vuepress-theme-hope/vuepress-theme-hope",
    docsBranch: "v1",
    docsDir: "docs/active-hash/src",

    footer: {
      display: true,
      copyright: "MIT Licensed | Copyright © 2019-present Mr.Hope",
    },

    git: {
      timezone: "Asia/Shanghai",
    },

    pwa: {
      favicon: "/active-hash/favicon.ico",
      themeColor: "#46bd87",
      cachePic: true,
      apple: {
        icon: "/active-hash/assets/icon/apple-icon-152.png",
        statusBarColor: "black",
      },
      msTile: {
        image: "/active-hash/assets/icon/ms-icon-144.png",
        color: "#ffffff",
      },
      manifest: {
        name: "vuepress-plugin-active-hash",
        short_name: "active-hash plugin",
        icons: [
          {
            src: "/active-hash/assets/icon/chrome-mask-512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/active-hash/assets/icon/chrome-mask-192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/active-hash/assets/icon/chrome-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/active-hash/assets/icon/chrome-192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
    },
  },
});
