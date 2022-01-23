import { path } from "@vuepress/utils";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";

import { getAlisa } from "./alias";
import { assignDefaultLocaleOptions } from "./defaultLocaleAssign";
import { extendsPage } from "./extends";
import { getPluginConfig } from "./plugins";

import type { Theme } from "@vuepress/core";
import type { HopeThemeOptions } from "../shared";

export const themeHope: Theme<HopeThemeOptions> = (
  { plugins = {}, ...localeOptions },
  app
) => {
  assignDefaultLocaleOptions(app, localeOptions);

  useSassPalettePlugin(app, {
    id: "hope",
    config: ".vuepress/styles/config.scss",
    defaultConfig: path.resolve(__dirname, "../client/styles/config.scss"),
    defaultPalette: path.resolve(__dirname, "../client/styles/palette.scss"),
    palette: ".vuepress/styles/palette.scss",
    style: ".vuepress/styles/index.scss",
  });

  return {
    name: "vuepress-theme-hope",

    alias: getAlisa(),

    layouts: path.resolve(__dirname, "../client/layouts"),

    clientAppEnhanceFiles: path.resolve(__dirname, "../client/appEnhance.js"),

    clientAppSetupFiles: path.resolve(__dirname, "../client/appSetup.js"),

    extendsPage,

    plugins: getPluginConfig(plugins, localeOptions),
  };
};
