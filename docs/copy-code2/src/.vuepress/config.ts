import { addViteOptimizeDepsInclude } from "@mr-hope/vuepress-shared";
import { path } from "@vuepress/utils";
import { defineHopeConfig } from "vuepress-theme-hope";
import { version } from "../../../../lerna.json";

const base = process.env.BASE || "/";
const hostname =
  process.env.HOSTNAME || "https://vuepress-theme-hope-v2.netlify.app";

export default defineHopeConfig({
  base: `/${base.replace(/^\//, "")}copy-code/`,

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
      title: "Quick Code Copy",
      description: "Quick Code Copy Plugin for vuepress",
    },

    "/zh/": {
      lang: "zh-CN",
      title: "代码一键复制",
      description: "VuePress 的代码一键复制插件",
    },
  },

  theme: "hope",

  themeConfig: {
    hostname,

    author: {
      name: "Mr.Hope",
      url: "https://mrhope.site",
    },

    iconPrefix: "iconfont icon-",

    repo: "https://github.com/vuepress-theme-hope/vuepress-theme-hope",

    docsDir: "docs/copy-code2/src",

    logo: "/logo.svg",

    footer: "MIT Licensed | Copyright © 2019-present Mr.Hope",
    displayFooter: true,

    pageInfo: ["PageView", "Category", "Tag", "ReadingTime"],

    locales: {
      "/": {
        navbar: [
          "/README.md",
          "/guide.md",
          "/config.md",
          {
            text: version,
            icon: "note",
            children: [
              {
                text: "V1 Docs",
                link: "https://vuepress-theme-hope.github.io/v1/copy-code/",
              },
            ],
          },
        ],

        sidebar: false,
      },

      "/zh/": {
        navbar: [
          "/zh/README.md",
          "/zh/guide.md",
          "/zh/config.md",
          {
            text: version,
            icon: "note",
            children: [
              {
                text: "V1 文档",
                link: "https://vuepress-theme-hope.github.io/v1/copy-code/zh/",
              },
            ],
          },
        ],

        sidebar: false,
      },
    },

    plugins: {
      comment: {
        type: "waline",
        serverURL: "https://vuepress-theme-hope-comment.vercel.app",
      },

      docsearch: {
        appId: "VXIEHELDL1",
        apiKey: "595796f71b6ba14326719682c3738c0c",
        indexName: "vuepress-theme-hope-v2",
      },

      mdEnhance: {
        codegroup: true,
      },

      pwa: {
        favicon: "/favicon.ico",
        themeColor: "#46bd87",
        cachePic: true,
        apple: {
          icon: "/assets/icon/apple-icon-152.png",
          statusBarColor: "black",
        },
        msTile: {
          image: "/assets/icon/ms-icon-144.png",
          color: "#ffffff",
        },
        manifest: {
          name: "vuepress-plugin-copy-code2",
          short_name: "copy-code plugin",
          icons: [
            {
              src: "/assets/icon/chrome-mask-512.png",
              sizes: "512x512",
              purpose: "maskable",
              type: "image/png",
            },
            {
              src: "/assets/icon/chrome-mask-192.png",
              sizes: "192x192",
              purpose: "maskable",
              type: "image/png",
            },
            {
              src: "/assets/icon/chrome-512.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "/assets/icon/chrome-192.png",
              sizes: "192x192",
              type: "image/png",
            },
          ],
          shortcuts: [
            {
              name: "Guide",
              short_name: "Guide",
              url: "/guide.html",
              icons: [
                {
                  src: "/assets/icon/guide-maskable.png",
                  sizes: "192x192",
                  purpose: "maskable",
                  type: "image/png",
                },
                {
                  src: "/assets/icon/guide-monochrome.png",
                  sizes: "192x192",
                  purpose: "monochrome",
                  type: "image/png",
                },
              ],
            },
            {
              name: "Config",
              short_name: "Config",
              url: "/config.html",
              icons: [
                {
                  src: "/assets/icon/config-maskable.png",
                  sizes: "192x192",
                  purpose: "maskable",
                  type: "image/png",
                },
                {
                  src: "/assets/icon/config-monochrome.png",
                  sizes: "192x192",
                  purpose: "monochrome",
                  type: "image/png",
                },
              ],
            },
          ],
        },
        appendBase: true,
      },
    },
  },

  plugins: [
    {
      name: "theme-enhance",
      alias: {
        "@theme-hope/components/HomeHero": path.resolve(
          __dirname,
          "./components/HopeHero"
        ),
      },
      onInitialized: (app) => {
        if (app.env.isDev)
          addViteOptimizeDepsInclude(app, [
            "@mr-hope/vuepress-shared/lib/client",
            "dayjs",
            "dayjs/plugin/localizedFormat",
            "dayjs/plugin/objectSupport",
            "dayjs/plugin/timezone",
            "dayjs/plugin/utc",
          ]);

        addViteOptimizeDepsInclude(app, [
          "three",
          "three/examples/jsm/controls/OrbitControls",
          "three/examples/jsm/loaders/STLLoader",
        ]);
      },
    },
  ],
});
