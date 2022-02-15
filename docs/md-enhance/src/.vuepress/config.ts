import { path } from "@vuepress/utils";
import { defineHopeConfig } from "vuepress-theme-hope";
import { version } from "../../../../lerna.json";

export default defineHopeConfig({
  base: "/v2/md-enhance/",

  dest: "./dist",

  head: [
    [
      "link",
      {
        rel: "stylesheet",
        href: "//at.alicdn.com/t/font_2410206_kxwb6og9m5.css",
      },
    ],
  ],

  locales: {
    "/": {
      lang: "en-US",
      title: "Markdown Enhance",
      description: "Markdown Enhancement for VuePress2",
    },

    "/zh/": {
      lang: "zh-CN",
      title: "Markdown 增强",
      description: "VuePress 的 Markdown 增强插件",
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

    docsDir: "docs/md-enhance/src",

    logo: "/logo.svg",

    footer: "MIT Licensed | Copyright © 2019-present Mr.Hope",
    displayFooter: true,

    pageInfo: ["PageView", "Category", "Tag", "ReadingTime"],

    locales: {
      "/": {
        navbar: [
          "/README.md",
          "/guide/README.md",
          "/config.md",
          "/migration.md",
          {
            text: version,
            icon: "note",
            children: [
              {
                text: "V1 Docs",
                link: "https://vuepress-theme-hope.github.io/md-enhance/",
              },
            ],
          },
        ],

        sidebar: {
          "/": [
            "README.md",
            {
              text: "Guide",
              icon: "creative",
              prefix: "guide/",
              children: [
                "README.md",
                "container.md",
                "code-group.md",
                "sup-sub.md",
                "align.md",
                "footnote.md",
                "mark.md",
                "tasklist.md",
                "flowchart.md",
                "mermaid.md",
                "tex.md",
                {
                  text: "Code Demo",
                  icon: "discover",
                  prefix: "demo/",
                  collapsable: true,
                  children: ["README.md", "normal.md", "vue.md", "react.md"],
                },
                {
                  text: "Presentation",
                  icon: "slides",
                  prefix: "presentation/",
                  collapsable: true,
                  children: ["README.md", "demo.md", "themes.md"],
                },
              ],
            },
            "config.md",
            "migration.md",
          ],

          "/guide/": [
            "README.md",
            "container.md",
            "code-group.md",
            "sup-sub.md",
            "align.md",
            "footnote.md",
            "mark.md",
            "tasklist.md",
            "flowchart.md",
            "mermaid.md",
            "tex.md",
            {
              text: "Code Demo",
              icon: "discover",
              prefix: "demo/",
              collapsable: true,
              children: ["README.md", "normal.md", "vue.md", "react.md"],
            },
            {
              text: "Presentation",
              icon: "slides",
              prefix: "presentation/",
              collapsable: true,
              children: ["README.md", "demo.md", "themes.md"],
            },
          ],
        },
      },

      "/zh/": {
        navbar: [
          "/zh/README.md",
          "/zh/guide/README.md",
          "/zh/config.md",
          "/zh/migration.md",
          {
            text: version,
            icon: "note",
            children: [
              {
                text: "V1 文档",
                link: "https://vuepress-theme-hope.github.io/md-enhance/zh/",
              },
            ],
          },
        ],

        sidebar: {
          "/zh/": [
            "README.md",
            {
              text: "指南",
              icon: "creative",
              prefix: "guide/",
              children: [
                "README.md",
                "container.md",
                "code-group.md",
                "sup-sub.md",
                "align.md",
                "footnote.md",
                "mark.md",
                "tasklist.md",
                "flowchart.md",
                "mermaid.md",
                "tex.md",
                {
                  text: "代码演示",
                  icon: "discover",
                  prefix: "demo/",
                  collapsable: true,
                  children: ["README.md", "normal.md", "vue.md", "react.md"],
                },
                {
                  text: "幻灯片",
                  icon: "slides",
                  prefix: "presentation/",
                  collapsable: true,
                  children: ["README.md", "demo.md", "themes.md"],
                },
              ],
            },
            "config.md",
            "migration.md",
          ],

          "/zh/guide/": [
            "README.md",
            "container.md",
            "code-group.md",
            "sup-sub.md",
            "align.md",
            "footnote.md",
            "mark.md",
            "tasklist.md",
            "flowchart.md",
            "mermaid.md",
            "tex.md",
            {
              text: "代码演示",
              icon: "discover",
              prefix: "demo/",
              collapsable: true,
              children: ["README.md", "normal.md", "vue.md", "react.md"],
            },
            {
              text: "幻灯片",
              icon: "slides",
              prefix: "presentation/",
              collapsable: true,
              children: ["README.md", "demo.md", "themes.md"],
            },
          ],
        },
      },
    },

    plugins: {
      comment: {
        type: "waline",
        serverURL: "https://vuepress-theme-hope-comment.vercel.app",
      },

      mdEnhance: {
        enableAll: true,
        presentation: {
          plugins: ["highlight", "math", "search", "notes", "zoom"],
        },
      },

      pwa: {
        favicon: "/v2/md-enhance/favicon.ico",
        themeColor: "#46bd87",
        cachePic: true,
        apple: {
          icon: "/v2/md-enhance/assets/icon/apple-icon-152.png",
          statusBarColor: "black",
        },
        msTile: {
          image: "/v2/md-enhance/assets/icon/ms-icon-144.png",
          color: "#ffffff",
        },
        manifest: {
          name: "vuepress-plugin-md-enhance",
          short_name: "md-enhance plugin",
          icons: [
            {
              src: "/v2/md-enhance/assets/icon/chrome-mask-512.png",
              sizes: "512x512",
              purpose: "maskable",
              type: "image/png",
            },
            {
              src: "/v2/md-enhance/assets/icon/chrome-mask-192.png",
              sizes: "192x192",
              purpose: "maskable",
              type: "image/png",
            },
            {
              src: "/v2/md-enhance/assets/icon/chrome-512.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "/v2/md-enhance/assets/icon/chrome-192.png",
              sizes: "192x192",
              type: "image/png",
            },
          ],
          shortcuts: [
            {
              name: "Guide",
              short_name: "Guide",
              url: "/v2/md-enhance/guide/",
              icons: [
                {
                  src: "/v2/md-enhance/assets/icon/guide-maskable.png",
                  sizes: "192x192",
                  purpose: "maskable",
                  type: "image/png",
                },
                {
                  src: "/v2/md-enhance/assets/icon/guide-monochrome.png",
                  sizes: "192x192",
                  purpose: "monochrome",
                  type: "image/png",
                },
              ],
            },
            {
              name: "Config",
              short_name: "Config",
              url: "/v2/md-enhance/config.html",
              icons: [
                {
                  src: "/v2/md-enhance/assets/icon/config-maskable.png",
                  sizes: "192x192",
                  purpose: "maskable",
                  type: "image/png",
                },
                {
                  src: "/v2/md-enhance/assets/icon/config-monochrome.png",
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
    [
      "@vuepress/plugin-register-components",
      {
        componentsDir: path.resolve(__dirname, "./components"),
        componentsPatterns: ["**/*.vue", "**/*.ts"],
      },
    ],
  ],
});
