import { defineUserConfig } from "@vuepress/cli";
import type { HopeThemeOptions } from "vuepress-theme-hope";

export default defineUserConfig<HopeThemeOptions>({
  base: "/v2/add-this/",

  dest: "./dist",

  locales: {
    "/": {
      lang: "en-US",
      title: "Share Plugin",
      description: "Share Plugin provided by AddThis",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "分享插件",
      description: "由 AddThis 提供的分享插件",
    },
  },

  theme: "hope",

  themeConfig: {
    hostname: "https://vuepress-theme-hope.github.io",

    author: { name: "Mr.Hope", mail: "mistr-hope@outlook.com" },

    iconPrefix: "iconfont icon-",

    repo: "https://github.com/vuepress-theme-hope/vuepress-theme-hope",

    docsDir: "docs/add-this/src",

    navbar: {
      logo: "/logo.svg",
    },

    locales: {
      "/": {
        navbar: {
          config: [
            { text: "Home", icon: "home", link: "/" },
            {
              text: "Guide",
              icon: "creative",
              link: "/guide/",
            },
            {
              text: "Config",
              icon: "config",
              link: "/config/",
            },
          ],
        },
      },
      "/zh/": {
        nav: [
          { text: "主页", icon: "home", link: "/zh/" },
          {
            text: "指南",
            icon: "creative",
            link: "/zh/guide/",
          },
          {
            text: "配置",
            icon: "config",
            link: "/zh/config/",
          },
        ],
      },
    },

    blog: false,

    footer: {
      display: true,
      copyright: "MIT Licensed | Copyright © 2019-present Mr.Hope",
    },

    plugins: {
      comment: {
        type: "waline",
        serverURL: "https://vuepress-theme-hope-comment.vercel.app",
      },

      mdEnhance: {
        codegroup: true,
      },

      pwa: {
        favicon: "/add-this/favicon.ico",
        themeColor: "#46bd87",
        cachePic: true,
        apple: {
          icon: "/add-this/assets/icon/apple-icon-152.png",
          statusBarColor: "black",
        },
        msTile: {
          image: "/add-this/assets/icon/ms-icon-144.png",
          color: "#ffffff",
        },
        manifest: {
          name: "vuepress-plugin-add-this",
          short_name: "add-this plugin",
          icons: [
            {
              src: "/add-this/assets/icon/chrome-mask-512.png",
              sizes: "512x512",
              purpose: "maskable",
              type: "image/png",
            },
            {
              src: "/add-this/assets/icon/chrome-mask-192.png",
              sizes: "192x192",
              purpose: "maskable",
              type: "image/png",
            },
            {
              src: "/add-this/assets/icon/chrome-512.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "/add-this/assets/icon/chrome-192.png",
              sizes: "192x192",
              type: "image/png",
            },
          ],
          shortcuts: [
            {
              name: "Guide",
              short_name: "Guide",
              url: "/add-this/guide/",
              icons: [
                {
                  src: "/add-this/assets/icon/guide-maskable.png",
                  sizes: "192x192",
                  purpose: "maskable",
                  type: "image/png",
                },
                {
                  src: "/add-this/assets/icon/guide-monochrome.png",
                  sizes: "192x192",
                  purpose: "monochrome",
                  type: "image/png",
                },
              ],
            },
            {
              name: "Config",
              short_name: "Config",
              url: "/add-this/config/",
              icons: [
                {
                  src: "/add-this/assets/icon/config-maskable.png",
                  sizes: "192x192",
                  purpose: "maskable",
                  type: "image/png",
                },
                {
                  src: "/add-this/assets/icon/config-monochrome.png",
                  sizes: "192x192",
                  purpose: "monochrome",
                  type: "image/png",
                },
              ],
            },
          ],
        },
      },
    },
  },

  plugins: [["add-this", { pubid: "ra-5f829c59e6c6bc9a" }]],
});
