import { defineUserConfig } from "@vuepress/cli";
import type { HopeThemeOptions } from "vuepress-theme-hope";

export default defineUserConfig<HopeThemeOptions>({
  base: "/v2/components/",

  dest: "./dist",

  locales: {
    "/": {
      lang: "en-US",
      title: "Components Lib",
      description: "Components Lib plugin for VuePress",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "组件库",
      description: "VuePress 的组件库插件",
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

    docsDir: "docs/components/src",

    navbar: {
      logo: "/logo.svg",
    },

    locales: {
      "/": {
        navbar: {
          config: [
            { text: "Home", icon: "home", link: "/README.md" },
            {
              text: "Guide",
              icon: "creative",
              link: "/guide/README.md",
            },
            {
              text: "Config",
              icon: "config",
              link: "/config/README.md",
            },
          ],
        },

        sidebar: {
          config: {
            "/": [
              {
                text: "Guide",
                icon: "creative",
                prefix: "guide/",
                collapsable: false,
                children: ["README.md", "page-info.md"],
              },
              "config/README.md",
            ],
          },
        },
      },

      "/zh/": {
        navbar: {
          config: [
            { text: "主页", icon: "home", link: "/zh/README.md" },
            {
              text: "指南",
              icon: "creative",
              link: "/zh/guide/README.md",
            },
            {
              text: "配置",
              icon: "config",
              link: "/zh/config/README.md",
            },
          ],
        },

        sidebar: {
          config: {
            "/zh/": [
              {
                text: "Guide",
                icon: "creative",
                prefix: "guide/",
                children: ["README.md", "page-info.md"],
              },
              "config/README.md",
            ],
          },
        },
      },
    },

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
        favicon: "/v2/components/favicon.ico",
        themeColor: "#46bd87",
        cachePic: true,
        apple: {
          icon: "/v2/components/assets/icon/apple-icon-152.png",
          statusBarColor: "black",
        },
        msTile: {
          image: "/v2/components/assets/icon/ms-icon-144.png",
          color: "#ffffff",
        },
        manifest: {
          name: "@mr-hope/vuepress-plugin-components",
          short_name: "components plugin",
          icons: [
            {
              src: "/v2/components/assets/icon/chrome-mask-512.png",
              sizes: "512x512",
              purpose: "maskable",
              type: "image/png",
            },
            {
              src: "/v2/components/assets/icon/chrome-mask-192.png",
              sizes: "192x192",
              purpose: "maskable",
              type: "image/png",
            },
            {
              src: "/v2/components/assets/icon/chrome-512.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "/v2/components/assets/icon/chrome-192.png",
              sizes: "192x192",
              type: "image/png",
            },
          ],
          shortcuts: [
            {
              name: "Guide",
              short_name: "Guide",
              url: "/v2/components/guide/",
              icons: [
                {
                  src: "/v2/components/assets/icon/guide-maskable.png",
                  sizes: "192x192",
                  purpose: "maskable",
                  type: "image/png",
                },
                {
                  src: "/v2/components/assets/icon/guide-monochrome.png",
                  sizes: "192x192",
                  purpose: "monochrome",
                  type: "image/png",
                },
              ],
            },
            {
              name: "Config",
              short_name: "Config",
              url: "/v2/components/config/",
              icons: [
                {
                  src: "/v2/components/assets/icon/config-maskable.png",
                  sizes: "192x192",
                  purpose: "maskable",
                  type: "image/png",
                },
                {
                  src: "/v2/components/assets/icon/config-monochrome.png",
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
