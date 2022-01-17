import { path } from "@vuepress/utils";
import { usePalettePlugin } from "vuepress-plugin-sass-palette";

import { assignDefaultLocaleOptions } from "./defaultLocaleAssign";
import {
  resolveActiveHeaderLinksPluginOptions,
  resolveContainerPluginOptionsForCodeGroup,
  resolveContainerPluginOptionsForCodeGroupItem,
  resolveGitPluginOptions,
} from "./plugins";

import type { Page, Theme, ThemeConfig } from "@vuepress/core";
import type {
  HopeThemeLocaleOptions,
  HopeThemePluginsOptions,
} from "../shared";

export interface HopeThemeOptions extends ThemeConfig, HopeThemeLocaleOptions {
  plugins?: HopeThemePluginsOptions;
}

export const themeHope: Theme<HopeThemeOptions> = (
  { plugins = {}, ...localeOptions },
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
      "@CommonWrapper": path.resolve(
        __dirname,
        "../client/components/CommonWrapper.js"
      ),
      "@Navbar": path.resolve(
        __dirname,
        "../client/components/navbar/index.js"
      ),
      "@Sidebar": path.resolve(
        __dirname,
        "../client/components/sidebar/index.js"
      ),
    },

    clientAppEnhanceFiles: path.resolve(__dirname, "../client/appEnhance.js"),

    clientAppSetupFiles: path.resolve(__dirname, "../client/appSetup.js"),

    // use the relative file path to generate edit link
    extendsPage: (page: Page<{ filePathRelative: string | null }>): void => {
      page.data.filePathRelative = page.filePathRelative;
    },

    plugins: [
      ["@mr-hope/components"],
      [
        "@vuepress/active-header-links",
        resolveActiveHeaderLinksPluginOptions(plugins),
      ],
      [
        "@vuepress/container",
        resolveContainerPluginOptionsForCodeGroup(plugins),
      ],
      [
        "@vuepress/container",
        resolveContainerPluginOptionsForCodeGroupItem(plugins),
      ],
      ["@vuepress/git", resolveGitPluginOptions(plugins, localeOptions)],
      ["@vuepress/nprogress", plugins.nprogress !== false],
      ["@vuepress/prismjs", plugins.prismjs !== false],
      ["@vuepress/theme-data", { themeData: localeOptions }],
      ["comment2", plugins.comment || { type: "disable" }],
      ["copy-code2", plugins.copyCode],
      ["feed2", plugins.feed],
      ["md-enhance", plugins.mdEnhance || {}],
      ["photo-swipe", plugins.photoSwipe],
      ["pwa2", plugins.pwa],
      ["seo2", plugins.seo],
      ["sitemap2", plugins.sitemap],
    ],
  };
};
