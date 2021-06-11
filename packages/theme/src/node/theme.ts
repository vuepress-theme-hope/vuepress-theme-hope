import { path } from "@vuepress/utils";
import { usePalettePlugin } from "vuepress-plugin-sass-palette";

import { assignDefaultLocaleOptions } from "./defaultLocaleAssign";
import {
  resolveActiveHeaderLinksPluginOptions,
  resolveContainerPluginOptionsForCodeGroup,
  resolveContainerPluginOptionsForCodeGroupItem,
  resolveGitPluginOptions,
} from "./plugins";

import type { Theme, ThemeConfig } from "@vuepress/core";
import type {
  HopeThemeLocaleOptions,
  HopeThemePluginsOptions,
} from "../shared";

export interface HopeThemeOptions extends ThemeConfig, HopeThemeLocaleOptions {
  /**
   * To avoid confusion with the root `plugins` option,
   * we use `themePlugins`
   */
  themePlugins?: HopeThemePluginsOptions;
}

export const themeHope: Theme<HopeThemeOptions> = (
  { themePlugins = {}, ...localeOptions },
  app
) => {
  assignDefaultLocaleOptions(localeOptions);

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

    layouts: path.resolve(__dirname, "../client/layouts"),

    alias: {
      "@Navbar": path.resolve(
        __dirname,
        "../client/components/navbar/Navbar.js"
      ),
      "@Sidebar": path.resolve(
        __dirname,
        "../client/components/sidebar/Sidebar.js"
      ),
    },

    clientAppEnhanceFiles: path.resolve(__dirname, "../client/appEnhance.js"),

    clientAppSetupFiles: path.resolve(__dirname, "../client/appSetup.js"),

    // use the relative file path to generate edit link
    extendsPageData: ({
      filePathRelative,
    }): { filePathRelative: string | null } => ({
      filePathRelative,
    }),

    plugins: [
      ["@mr-hope/components"],
      [
        "@vuepress/active-header-links",
        resolveActiveHeaderLinksPluginOptions(themePlugins),
      ],
      [
        "@vuepress/container",
        resolveContainerPluginOptionsForCodeGroup(themePlugins),
      ],
      [
        "@vuepress/container",
        resolveContainerPluginOptionsForCodeGroupItem(themePlugins),
      ],
      ["@vuepress/git", resolveGitPluginOptions(themePlugins, localeOptions)],
      ["@vuepress/nprogress", themePlugins.nprogress !== false],
      ["@vuepress/prismjs", themePlugins.prismjs !== false],
      ["@vuepress/theme-data", { themeData: localeOptions }],
      ["comment2", themePlugins.comment || { type: "disable" }],
      ["copy-code2", themePlugins.copyCode],
      ["feed2", themePlugins.feed],
      ["md-enhance", themePlugins.mdEnhance || {}],
      ["photo-swipe", themePlugins.photoSwipe],
      ["seo2", themePlugins.seo],
      ["sitemap2", themePlugins.sitemap],
    ],
  };
};
