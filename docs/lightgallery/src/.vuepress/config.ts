import { addViteOptimizeDepsInclude } from "@mr-hope/vuepress-shared";
import { path } from "@vuepress/utils";
import { lightgallery } from "vuepress-plugin-lightgallery";
import { defineHopeConfig } from "vuepress-theme-hope";
import themeConfig from "./themeConfig";

const base = (process.env.BASE || "/") as "/" | `/${string}/`;

export default defineHopeConfig({
  base: `${base}lightgallery/`,

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
      title: "LightGallery plugin",
      description: "LightGallery plugin for VuePress2",
    },

    "/zh/": {
      lang: "zh-CN",
      title: "LightGallery 插件",
      description: "VuePress2 的 LightGallery 插件",
    },
  },

  themeConfig,

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

  plugins: [lightgallery({ selector: ".theme-hope-content :not(a) > img" })],
});
