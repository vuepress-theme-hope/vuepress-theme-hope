import { path } from "@vuepress/utils";
import { assignDefaultLocaleOptions } from "./defaultLocaleAssign";
import {
  resolveActiveHeaderLinksPluginOptions,
  resolveContainerPluginOptions,
  resolveContainerPluginOptionsForDetails,
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

export const themeHope: Theme<HopeThemeOptions> = ({
  themePlugins = {},
  ...localeOptions
}) => {
  assignDefaultLocaleOptions(localeOptions);

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
      ["@mr-hope/palette"],
      [
        "@vuepress/active-header-links",
        resolveActiveHeaderLinksPluginOptions(themePlugins),
      ],
      ["@vuepress/back-to-top", themePlugins.backToTop !== false],
      [
        "@vuepress/container",
        resolveContainerPluginOptions(themePlugins, localeOptions, "tip"),
      ],
      [
        "@vuepress/container",
        resolveContainerPluginOptions(themePlugins, localeOptions, "warning"),
      ],
      [
        "@vuepress/container",
        resolveContainerPluginOptions(themePlugins, localeOptions, "danger"),
      ],
      [
        "@vuepress/container",
        resolveContainerPluginOptionsForDetails(themePlugins),
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
      ["@vuepress/palette", { preset: "sass" }],
      ["@vuepress/prismjs", themePlugins.prismjs !== false],
      ["@vuepress/theme-data", { themeData: localeOptions }],
    ],
  };
};
