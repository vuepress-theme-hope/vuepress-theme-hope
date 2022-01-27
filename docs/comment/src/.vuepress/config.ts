import { defineUserConfig } from "@vuepress/cli";
import type { HopeThemeOptions } from "vuepress-theme-hope";

export default defineUserConfig<HopeThemeOptions>({
  base: "/v2/comment/",

  dest: "./dist",

  locales: {
    "/": {
      lang: "en-US",
      title: "Comment Plugin",
      description: "Comment Plugin for VuePress",
    },

    "/zh/": {
      lang: "zh-CN",
      title: "评论插件",
      description: "VuePress 的评论插件",
    },
  },

  theme: "hope",

  themeConfig: {
    hostname: "https://vuepress-theme-hope.github.io",

    author: {
      name: "Mr.Hope",
      url: "https://mrhope.site",
    },

    iconPrefix: "iconfont icon-",

    repo: "https://github.com/vuepress-theme-hope/vuepress-theme-hope",

    docsDir: "docs/comment/src",

    logo: "/logo.svg",

    locales: {
      "/": {
        navbar: [
          { text: "Home", icon: "home", link: "/README.md" },
          {
            text: "Guide",
            icon: "creative",
            children: [
              {
                text: "Guide",
                icon: "creative",
                link: "/guide/README.md",
              },
              { text: "Waline", icon: "waline", link: "/guide/waline.md" },
            ],
          },
          {
            text: "Config",
            icon: "config",
            children: [
              { text: "Config", icon: "config", link: "/config/README.md" },
              {
                text: "Waline",
                icon: "waline",
                link: "/config/waline.md",
              },
            ],
          },
        ],

        sidebar: {
          "/": [
            {
              text: "Guide",
              icon: "creative",
              children: ["guide/README.md", "guide/waline.md"],
            },
            {
              text: "Config",
              icon: "config",
              children: ["config/README.md", "config/waline.md"],
            },
          ],
        },
      },
      "/zh/": {
        navbar: [
          { text: "主页", icon: "home", link: "/zh/README.md" },
          {
            text: "指南",
            icon: "creative",
            children: [
              {
                text: "指南",
                icon: "creative",
                link: "/zh/guide/README.md",
              },
              { text: "Waline", icon: "waline", link: "/zh/guide/waline.md" },
            ],
          },
          {
            text: "配置",
            icon: "config",
            children: [
              { text: "配置", icon: "config", link: "/zh/config/README.md" },
              {
                text: "Waline",
                icon: "waline",
                link: "/zh/config/waline.md",
              },
            ],
          },
        ],

        sidebar: {
          "/zh/": [
            {
              text: "指南",
              icon: "creative",
              children: ["guide/README.md", "guide/waline.md"],
            },
            {
              text: "配置",
              icon: "config",
              children: ["config/README.md", "config/waline.md"],
            },
          ],
        },
      },
    },

    footer: "MIT Licensed | Copyright © 2019-present Mr.Hope",

    displayFooter: true,
    plugins: {
      comment: {
        type: "waline",
        serverURL: "https://vuepress-theme-hope-comment.vercel.app",
      },

      mdEnhance: {
        codegroup: true,
      },

      pwa: {
        favicon: "/comment/favicon.ico",
        themeColor: "#46bd87",
        cachePic: true,
        apple: {
          icon: "/v2/comment/assets/icon/apple-icon-152.png",
          statusBarColor: "black",
        },
        msTile: {
          image: "/v2/comment/assets/icon/ms-icon-144.png",
          color: "#ffffff",
        },
        manifest: {
          name: "vuepress-plugin-comment2",
          short_name: "comment plugin",
          icons: [
            {
              src: "/v2/comment/assets/icon/chrome-mask-512.png",
              sizes: "512x512",
              purpose: "maskable",
              type: "image/png",
            },
            {
              src: "/v2/comment/assets/icon/chrome-mask-192.png",
              sizes: "192x192",
              purpose: "maskable",
              type: "image/png",
            },
            {
              src: "/v2/comment/assets/icon/chrome-512.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "/v2/comment/assets/icon/chrome-192.png",
              sizes: "192x192",
              type: "image/png",
            },
          ],
          shortcuts: [
            {
              name: "Guide",
              short_name: "Guide",
              url: "/comment/guide/",
              icons: [
                {
                  src: "/v2/comment/assets/icon/guide-maskable.png",
                  sizes: "192x192",
                  purpose: "maskable",
                  type: "image/png",
                },
                {
                  src: "/v2/comment/assets/icon/guide-monochrome.png",
                  sizes: "192x192",
                  purpose: "monochrome",
                  type: "image/png",
                },
              ],
            },
            {
              name: "Config",
              short_name: "Config",
              url: "/comment/config/",
              icons: [
                {
                  src: "/v2/comment/assets/icon/config-maskable.png",
                  sizes: "192x192",
                  purpose: "maskable",
                  type: "image/png",
                },
                {
                  src: "/v2/comment/assets/icon/config-monochrome.png",
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
});
