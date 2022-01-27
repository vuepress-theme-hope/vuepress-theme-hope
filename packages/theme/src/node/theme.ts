import { addViteOptimizeDeps, useGitPlugin } from "@mr-hope/vuepress-shared";
import { path } from "@vuepress/utils";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";

import { getAlias } from "./alias";
import { assignDefaultLocaleOptions } from "./defaultLocaleAssign";
import { extendsPage } from "./extends";
import { getPluginConfig } from "./plugins";

import type { Theme } from "@vuepress/core";
import type { HopeThemeOptions } from "../shared";

export const themeHope: Theme<HopeThemeOptions> = (
  { plugins = {}, ...localeOptions },
  app
) => {
  addViteOptimizeDeps(app, ["@vueuse/core", "lodash.throttle"]);

  if (app.env.isDev)
    addViteOptimizeDeps(app, "@mr-hope/vuepress-shared/lib/client");

  assignDefaultLocaleOptions(app, localeOptions);

  useGitPlugin(app, {
    createdTime: true,
    contributors: true,
    updatedTime: true,
  });

  useSassPalettePlugin(app, {
    id: "hope",
    config: ".vuepress/styles/config.scss",
    defaultConfig: path.resolve(__dirname, "../../templates/config.scss"),
    defaultPalette: path.resolve(__dirname, "../../templates/palette.scss"),
    palette: ".vuepress/styles/palette.scss",
    style: ".vuepress/styles/index.scss",
  });

  return {
    name: "vuepress-theme-hope",

    alias: getAlias(),

    layouts: path.resolve(__dirname, "../client/layouts"),

    templateBuild: path.resolve(__dirname, "../../templates/index.build.html"),

    clientAppEnhanceFiles: path.resolve(__dirname, "../client/appEnhance.js"),

    clientAppSetupFiles: path.resolve(__dirname, "../client/appSetup.js"),

    extendsPage,

    plugins: getPluginConfig(plugins, localeOptions),
  };
};
