import { addViteOptimizeDeps, useGitPlugin } from "@mr-hope/vuepress-shared";
import { path } from "@vuepress/utils";
import { useReadingTimePlugin } from "vuepress-plugin-reading-time2";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";

import { getAlias } from "./alias";
import { handleThemeData } from "./handleThemeData";
import { handleWebpackOptions } from "./encrypt";
import { extendsPage } from "./extends";
import { getLayoutConfig } from "./layout";
import { getPluginConfig } from "./plugins";

import type { Page, Theme } from "@vuepress/core";
import type {
  HopeThemeConfig,
  HopeThemeOptions,
  HopeThemePageData,
} from "../shared";

export const themeHope: Theme<HopeThemeOptions> = (
  { plugins = {}, ...themeOptions },
  app
) => {
  addViteOptimizeDeps(app, [
    "@vueuse/core",
    "bcryptjs",
    "body-scroll-lock",
    "lodash.throttle",
  ]);

  if (app.env.isDev)
    addViteOptimizeDeps(app, "@mr-hope/vuepress-shared/lib/client");

  handleThemeData(app, themeOptions);
  handleWebpackOptions(app);

  useGitPlugin(app, {
    createdTime: true,
    contributors: true,
    updatedTime: true,
  });
  useReadingTimePlugin(app, {
    wordPerminute: plugins.readingTime?.wordPerminute,
  });

  useSassPalettePlugin(app, {
    id: "hope",
    config: ".vuepress/styles/config.scss",
    defaultConfig: path.resolve(__dirname, "../../templates/config.scss"),
    defaultPalette: path.resolve(__dirname, "../../templates/palette.scss"),
    generator: path.resolve(__dirname, "../../templates/generator.scss"),
    palette: ".vuepress/styles/palette.scss",
    style: ".vuepress/styles/index.scss",
  });

  return {
    name: "vuepress-theme-hope",

    alias: getAlias(app),

    define: () => ({
      ENABLE_BLOG: Boolean(plugins.blog),
    }),

    layouts: getLayoutConfig(app, plugins),

    templateBuild: path.resolve(__dirname, "../../templates/index.build.html"),

    clientAppEnhanceFiles: path.resolve(__dirname, "../client/appEnhance.js"),

    clientAppSetupFiles: [
      ...(plugins.blog
        ? [path.resolve(__dirname, "../client/module/blog/appSetup.js")]
        : []),
      path.resolve(__dirname, "../client/module/outlook/appSetup.js"),
      path.resolve(__dirname, "../client/module/sidebar/appSetup.js"),
    ],

    extendsPage: (page) =>
      extendsPage(
        app,
        themeOptions as HopeThemeConfig,
        page as Page<HopeThemePageData>
      ),

    plugins: getPluginConfig(app, plugins, themeOptions as HopeThemeConfig),
  };
};
