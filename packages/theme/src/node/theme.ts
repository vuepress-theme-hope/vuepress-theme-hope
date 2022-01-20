import { path } from "@vuepress/utils";
import { usePalettePlugin } from "vuepress-plugin-sass-palette";

import { getAlisa } from "./alias";
import { assignDefaultLocaleOptions } from "./defaultLocaleAssign";
import { getPluginConfig } from "./plugins";

import type { Page, Theme } from "@vuepress/core";
import type { HopeThemeData, HopeThemePageData } from "../shared";

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

    // use the relative file path to generate edit link
    extendsPage: (page: Page<HopeThemePageData>): void => {
      // save relative file path into page data to generate edit link
      page.data.filePathRelative = page.filePathRelative;
      // save basic info to routeMeta
      page.routeMeta = {
        ...page.routeMeta,
        title: page.title,
        icon: page.frontmatter.icon,
        // author: page.frontmatter.author,
        // category: page.frontmatter.category || page.frontmatter.categories,
        // tag: page.frontmatter.tags || page.frontmatter.tag,
      };
    },

    plugins: getPluginConfig(plugins, localeOptions),
  };
};
