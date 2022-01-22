import { path } from "@vuepress/utils";
import { usePalettePlugin } from "vuepress-plugin-sass-palette";

import { getAlisa } from "./alias";
import { assignDefaultLocaleOptions } from "./defaultLocaleAssign";
import { extendsPage } from "./extends";
import { getPluginConfig } from "./plugins";

import type { Theme } from "@vuepress/core";
import type { HopeThemeData } from "../shared";

export const themeHope: Theme<HopeThemeData> = (
  { plugins = {}, ...localeOptions },
  app
) => {
  assignDefaultLocaleOptions(app, localeOptions);

  usePalettePlugin(app, {
    id: "hope",
    config: ".vuepress/styles/config.scss",
    defaultConfig: path.resolve(__dirname, "../client/styles/config.scss"),
    defaultPalette: path.resolve(__dirname, "../client/styles/palette.scss"),
    palette: ".vuepress/styles/palette.scss",
    style: ".vuepress/styles/index.scss",
  });

  return {
    name: "@vuepress/theme-default",

    alias: getAlisa(),

    layouts: path.resolve(__dirname, "../client/layouts"),

    clientAppEnhanceFiles: path.resolve(__dirname, "../client/appEnhance.js"),

    clientAppSetupFiles: path.resolve(__dirname, "../client/appSetup.js"),

    extendsPage,

    plugins: getPluginConfig(plugins, localeOptions),
  };
};
