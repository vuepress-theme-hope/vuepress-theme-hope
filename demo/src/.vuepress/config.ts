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

  theme: "hope",

  themeConfig: {
    navbar: {
      logo: "/logo.svg",
      repo: "https://github.com/vuepress-theme-hope/vuepress-theme-hope",
    },

    meta: {
      docsDir: "demo/src",
    },

    author: "Mr.Hope",
    darkmode: "auto-switch",
    hostname: "https://vuepress-theme-hope-v2-demo.mrhope.site",

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
        navbar: {
          config: navbar.en,
        },

        // sidebar
        sidebar: {
          config: sidebar.en,
        },

        footer: {
          display: true,
          content: "Default footer",
        },

        metaLocales: {
          editLink: "Edit this page on GitHub",
        },
      },

      /**
       * Chinese locale config
       */
      "/zh/": {
        // navbar
        navbar: {
          config: navbar.zh,
        },

        // sidebar
        sidebar: {
          config: sidebar.zh,
        },

        footer: {
          display: true,
          content: "默认页脚",
        },

        // page meta

        metaLocales: {
          editLink: "在 GitHub 上编辑此页",
        },
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
