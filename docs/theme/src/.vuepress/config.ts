import { addViteConfig, config, pwaHead } from "@docs/shared";
import { getDirname, path } from "vuepress/utils";

import theme from "./theme.js";

const __dirname = getDirname(import.meta.url);

// The config wrapper is located in <root>/docs/shared/src/config-wrapper.ts
export default config("", {
  head: [
    ...pwaHead,
    [
      "meta",
      {
        name: "google-site-verification",
        content: "qG3soux9jAKB4Q_DYf7yj1p5cEIuib6yG4zDhpmv2_E",
      },
    ],
  ],

  locales: {
    "/": {
      lang: "en-US",
      title: "vuepress-theme-hope",
      description: "A VuePress theme with tons of features✨",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "vuepress-theme-hope",
      description: "一个具有强大功能的 vuepress 主题✨",
    },
  },

  theme,

  extendsBundlerOptions: (bundlerOptions, app) => {
    // FIXME: see https://github.com/zhw2590582/ArtPlayer/issues/1028
    addViteConfig(bundlerOptions, app, {
      build: {
        rollupOptions: {
          onLog(
            level: "info" | "debug" | "warn",
            log: { code: string; id: string },
            defaultHandler: (
              level: "info" | "debug" | "warn",
              log: { code: string; id: string },
            ) => void,
          ) {
            if (log.code === "COMMONJS_VARIABLE_IN_ESM" && log.id.includes("artplayer")) return;

            defaultHandler(level, log);
          },
        },
      },
    });
  },

  pagePatterns: ["**/*.md", "!**/*.snippet.md", "!.vuepress", "!node_modules"],

  alias: {
    "@FlowChartPlayground": path.resolve(__dirname, "./components/FlowChartPlayground.js"),
    "@KatexPlayground": path.resolve(__dirname, "./components/KatexPlayground.js"),
    "@ToggleRTLButton": path.resolve(__dirname, "./components/ToggleRTLButton.js"),
  },

  clientConfigFile: path.resolve(__dirname, "./client.ts"),
});
