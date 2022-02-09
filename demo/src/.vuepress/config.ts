import * as chokidar from "chokidar";
import { defineUserConfig } from "@vuepress/cli";
import type { HopeThemeOptions } from "vuepress-theme-hope";
import { chalk, logger, path } from "@vuepress/utils";
import { navbar, sidebar } from "./configs";

const isProd = process.env.NODE_ENV === "production";

export default defineUserConfig<HopeThemeOptions>({
  base: "/v2-demo/",

  dest: "./dist",

  head: [
    [
      "script",
      { src: "https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" },
    ],
    [
      "script",
      {
        src: "https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js",
      },
    ],
    [
      "script",
      {
        src: "https://cdn.jsdelivr.net/npm/vue@next/dist/vue.global.prod.js",
      },
    ],
    [
      "script",
      { src: "https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js" },
    ],
  ],

  locales: {
    "/": {
      lang: "en-US",
      title: "Theme Demo",
      description: "A demo for vuepress-theme-hope",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "主题演示",
      description: "vuepress-theme-hope 的演示",
    },
  },

  theme: "hope",

  themeConfig: {
    hostname: "https://vuepress-theme-hope-v2-demo.mrhope.site",

    author: {
      name: "Mr.Hope",
      url: "https://mrhope.site",
    },

    iconPrefix: "iconfont icon-",

    logo: "/logo.svg",

    fullScreen: true,

    repo: "https://github.com/vuepress-theme-hope/vuepress-theme-hope",

    docsDir: "demo/src",

    locales: {
      "/": {
        // navbar
        navbar: navbar.en,

        // sidebar
        sidebar: sidebar.en,

        footer: "Default footer",

        displayFooter: true,

        metaLocales: {
          editLink: "Edit this page on GitHub",
        },
      },

      /**
       * Chinese locale config
       */
      "/zh/": {
        // navbar
        navbar: navbar.zh,

        // sidebar
        sidebar: sidebar.zh,

        footer: "默认页脚",

        displayFooter: true,

        // page meta
        metaLocales: {
          editLink: "在 GitHub 上编辑此页",
        },
      },
    },

    encrypt: {
      config: { "/guide/encrypt.html": ["1234"] },
    },

    plugins: {
      blog: true,

      mdEnhance: { enableAll: true },

      pwa: {
        favicon: "/v2-demo/favicon.ico",
        cachePic: true,
        apple: {
          icon: "/v2-demo/assets/icon/apple-icon-152.png",
          statusBarColor: "black",
        },
        msTile: {
          image: "/v2-demo/assets/icon/ms-icon-144.png",
          color: "#ffffff",
        },
        manifest: {
          icons: [
            {
              src: "/v2-demo/assets/icon/chrome-mask-512.png",
              sizes: "512x512",
              purpose: "maskable",
              type: "image/png",
            },
            {
              src: "/v2-demo/assets/icon/chrome-mask-192.png",
              sizes: "192x192",
              purpose: "maskable",
              type: "image/png",
            },
            {
              src: "/v2-demo/assets/icon/chrome-512.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "/v2-demo/assets/icon/chrome-192.png",
              sizes: "192x192",
              type: "image/png",
            },
          ],
          shortcuts: [
            {
              name: "Guide",
              short_name: "Guide",
              url: "/v2-demo/guide/",
              icons: [
                {
                  src: "/v2-demo/assets/icon/guide-maskable.png",
                  sizes: "192x192",
                  purpose: "maskable",
                  type: "image/png",
                },
                {
                  src: "/v2-demo/assets/icon/guide-monochrome.png",
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

  markdown: {
    importCode: {
      handleImportPath: (str) =>
        str.replace(
          /^@vuepress/,
          path.resolve(__dirname, "../../packages/@vuepress")
        ),
    },
  },

  plugins: [
    [
      "@vuepress/plugin-register-components",
      {
        componentsDir: path.resolve(__dirname, "./components"),
      },
    ],
    // only enable shiki plugin in production mode
    ["@vuepress/plugin-shiki", isProd ? { theme: "dark-plus" } : false],
  ],

  onWatched: (_, watchers, restart) => {
    const watcher = chokidar.watch("configs/**/*.ts", {
      cwd: __dirname,
      ignoreInitial: true,
    });
    watcher.on("change", async (file) => {
      logger.info(`file ${chalk.magenta(file)} is modified`);
      await restart();
    });
    watchers.push(watcher);
  },
});
