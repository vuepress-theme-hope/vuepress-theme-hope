import * as chokidar from "chokidar";
import { defineUserConfig } from "@vuepress/cli";
import type { HopeThemeOptions } from "vuepress-theme-hope";
import { chalk, logger, path } from "@vuepress/utils";
import { navbar, sidebar } from "./configs";

const isProd = process.env.NODE_ENV === "production";

export default defineUserConfig<HopeThemeOptions>({
  base: "/",

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

  bundler:
    // specify bundler via environment variable
    process.env.DOCS_BUNDLER ??
    // use vite in dev, use webpack in prod
    (isProd ? "@vuepress/webpack" : "@vuepress/vite"),

  theme: "hope",

  themeConfig: {
    logo: "/logo.svg",
    hostname: "https://vuepress-theme-hope-v2-demo.mrhope.site",

    author: "Mr.Hope",
    repo: "https://github.com/vuepress-theme-hope/vuepress-theme-hope",

    docsDir: "demo/src",

    darkmode: true,

    // theme-level locales config
    locales: {
      /**
       * English locale config
       *
       * As the default locale of @vuepress/theme-default is English,
       * we don't need to set all of the locale fields
       */
      "/": {
        // navbar
        navbar: navbar.en,

        // sidebar
        sidebar: sidebar.en,

        footer: {
          display: true,
          content: "Default footer",
        },

        // page meta
        editLinkText: "Edit this page on GitHub",
      },

      /**
       * Chinese locale config
       */
      "/zh/": {
        // navbar
        navbar: navbar.zh,
        selectLanguageName: "简体中文",
        selectLanguageText: "选择语言",
        selectLanguageAriaLabel: "选择语言",

        // sidebar
        sidebar: sidebar.zh,

        footer: {
          display: true,
          content: "默认页脚",
        },

        // page meta
        editLinkText: "在 GitHub 上编辑此页",
        lastUpdatedText: "上次更新",
        contributorsText: "贡献者",

        // custom containers
        tip: "提示",
        warning: "注意",
        danger: "警告",

        // 404 page
        notFound: [
          "这里什么都没有",
          "我们怎么到这来了？",
          "这是一个 404 页面",
          "看起来我们进入了错误的链接",
        ],
        backToHome: "返回首页",

        // other
        openInNewWindow: "在新窗口打开",
      },
    },

    plugins: {
      mdEnhance: { enableAll: true },
      // only enable git plugin in production mode
      git: isProd,
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
    ["@vuepress/plugin-debug"],
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
