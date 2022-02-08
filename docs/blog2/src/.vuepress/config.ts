import { defineUserConfig } from "@vuepress/cli";
import { version } from "../../../../lerna.json";
import type { HopeThemeOptions } from "vuepress-theme-hope";

export default defineUserConfig<HopeThemeOptions>({
  base: "/v2/blog/",

  dest: "./dist",

  locales: {
    "/": {
      lang: "en-US",
      title: "Blog plugin",
      description: "Blog plugin for VuePress2",
    },

    "/zh/": {
      lang: "zh-CN",
      title: "博客插件",
      description: "VuePress2 的博客插件",
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

    docsDir: "docs/blog2/src",

    logo: "/logo.svg",

    footer: "MIT Licensed | Copyright © 2019-present Mr.Hope",
    displayFooter: true,

    locales: {
      "/": {
        navbar: [
          { text: "Home", icon: "home", link: "/README.md" },
          {
            text: "Guide",
            icon: "creative",
            link: "/guide.md",
          },
          {
            text: "Config",
            icon: "config",
            link: "/config.md",
          },
          {
            text: version,
            icon: "note",
            children: [
              {
                text: "V1 Docs",
                link: "https://vuepress-theme-hope.github.io/blog2/",
              },
            ],
          },
        ],
        sidebar: ["/guide.md", "/config.md"],
      },
      "/zh/": {
        navbar: [
          { text: "主页", icon: "home", link: "/zh/README.md" },
          {
            text: "指南",
            icon: "creative",
            link: "/zh/guide.md",
          },
          {
            text: "配置",
            icon: "config",
            link: "/zh/config.md",
          },
          {
            text: version,
            icon: "note",
            children: [
              {
                text: "V1 文档",
                link: "https://vuepress-theme-hope.github.io/blog2/zh/",
              },
            ],
          },
        ],
        sidebar: ["/zh/guide.md", "/zh/config.md"],
      },
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
        favicon: "/v2/blog/favicon.ico",
        themeColor: "#46bd87",
        cachePic: true,
        apple: {
          icon: "/v2/blog/assets/icon/apple-icon-152.png",
          statusBarColor: "black",
        },
        msTile: {
          image: "/v2/blog/assets/icon/ms-icon-144.png",
          color: "#ffffff",
        },
        manifest: {
          name: "vuepress-plugin-blog2",
          short_name: "blog2 plugin",
          icons: [
            {
              src: "/v2/blog/assets/icon/chrome-mask-512.png",
              sizes: "512x512",
              purpose: "maskable",
              type: "image/png",
            },
            {
              src: "/v2/blog/assets/icon/chrome-mask-192.png",
              sizes: "192x192",
              purpose: "maskable",
              type: "image/png",
            },
            {
              src: "/v2/blog/assets/icon/chrome-512.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "/v2/blog/assets/icon/chrome-192.png",
              sizes: "192x192",
              type: "image/png",
            },
          ],
          shortcuts: [
            {
              name: "Guide",
              short_name: "Guide",
              url: "/v2/blog/guide/",
              icons: [
                {
                  src: "/v2/blog/assets/icon/guide-maskable.png",
                  sizes: "192x192",
                  purpose: "maskable",
                  type: "image/png",
                },
                {
                  src: "/v2/blog/assets/icon/guide-monochrome.png",
                  sizes: "192x192",
                  purpose: "monochrome",
                  type: "image/png",
                },
              ],
            },
            {
              name: "Config",
              short_name: "Config",
              url: "/v2/blog/config/",
              icons: [
                {
                  src: "/v2/blog/assets/icon/config-maskable.png",
                  sizes: "192x192",
                  purpose: "maskable",
                  type: "image/png",
                },
                {
                  src: "/v2/blog/assets/icon/config-monochrome.png",
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

  plugins: [["blog2", { pubid: "ra-5f829c59e6c6bc9a" }]],
});
