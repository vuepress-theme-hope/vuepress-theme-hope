import { addViteOptimizeDeps } from "@mr-hope/vuepress-shared";
import { path } from "@vuepress/utils";
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  base: "/v2/blog/",

  dest: "./dist",

  head: [
    [
      "link",
      {
        rel: "stylesheet",
        href: "//at.alicdn.com/t/font_2410206_mfj6e1vbwo.css",
      },
    ],
  ],

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

    docsDir: "docs/blog/src",

    logo: "/logo.svg",

    footer: "MIT Licensed | Copyright © 2019-present Mr.Hope",
    displayFooter: true,

    pageInfo: ["PageView", "Category", "Tag", "ReadingTime"],

    locales: {
      "/": {
        navbar: ["/README.md", "/guide.md", "/config.md"],
        sidebar: ["/guide.md", "/config.md"],
      },
      "/zh/": {
        navbar: ["/zh/README.md", "/zh/guide.md", "/zh/config.md"],
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

  plugins: [
    [
      "@vuepress/docsearch",
      {
        appId: "VXIEHELDL1",
        apiKey: "595796f71b6ba14326719682c3738c0c",
        indexName: "vuepress-theme-hope-v2",
      },
    ],
    (_options, app) => {
      addViteOptimizeDeps(app, [
        "three",
        "three/examples/jsm/controls/OrbitControls",
        "three/examples/jsm/loaders/STLLoader",
      ]);

      return {
        name: "theme-enhance",
        alias: {
          "@theme-hope/components/HomeHero": path.resolve(
            __dirname,
            "./components/HopeHero"
          ),
        },
      };
    },
  ],
});
