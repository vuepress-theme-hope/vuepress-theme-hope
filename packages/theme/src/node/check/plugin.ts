import { keys } from "@vuepress/helper";
import type { App } from "vuepress/core";
import { colors } from "vuepress/utils";

import type { PluginsOptions } from "../../shared/index.js";
import { logger } from "../utils.js";

const PLUGIN_CHECKLIST = [
  ["@vuepress/plugin-active-header-links", "activeHeaderLinks"],
  ["@vuepress/plugin-blog", "blog"],
  ["@vuepress/plugin-catalog", "catalog"],
  ["@vuepress/plugin-copy-code", "copyCode"],
  ["@vuepress/plugin-copyright", "copyright"],
  ["@vuepress/plugin-comment", "comment"],
  ["@vuepress/plugin-docsearch", "docsearch"],
  ["@vuepress/plugin-search", "search"],
  ["@vuepress/plugin-feed", "feed"],
  ["@vuepress/plugin-links-check", "linksCheck"],
  ["@vuepress/plugin-photo-swipe", "photoSwipe"],
  ["@vuepress/plugin-pwa", "pwa"],
  ["@vuepress/plugin-reading-time", "readingTime"],
  ["@vuepress/plugin-rtl", "", 'Set "rtl: true" in the needed theme locales.'],
  ["@vuepress/plugin-seo", "seo"],
  ["@vuepress/plugin-sitemap", "sitemap"],
  "@vuepress/plugin-theme-data",
  ["vuepress-plugin-components", "components"],
  ["vuepress-plugin-md-enhance", "mdEnhance"],
  ["vuepress-plugin-search-pro", "searchPro"],
];

const KNOWN_THEME_PLUGINS = [
  "activeHeaderLinks",
  "backToTop",
  "blog",
  "catalog",
  "components",
  "comment",
  "copyCode",
  "copyright",
  "docsearch",
  "externalLinkIcon",
  "feed",
  "git",
  "linksCheck",
  "mdEnhance",
  "nprogress",
  "photoSwipe",
  "prismjs",
  "pwa",
  "readingTime",
  "redirect",
  "search",
  "searchPro",
  "seo",
  "sitemap",
];

/**
 * @private
 *
 * Check theme plugin options for noob users
 */
export const checkPluginOptions = (plugins: PluginsOptions): void => {
  keys(plugins).forEach((key) => {
    if (!KNOWN_THEME_PLUGINS.includes(key))
      logger.warn(
        `You are setting "${colors.magenta(
          `plugins.${key}`,
        )}" option in ${colors.cyan(
          "theme options",
        )}, but it's not supported by theme. You need to install the plugin yourself and import then call it manually in "${colors.magenta(
          "plugins",
        )}" options in ${colors.cyan("vuepress config file")} directly.`,
      );
  });
};

/**
 * @private
 *
 * Check user plugin options for noob users
 */
export const checkUserPlugin = (app: App): void => {
  PLUGIN_CHECKLIST.forEach(([pluginName, optionName = "", hint = ""]) => {
    const themeIndex = app.pluginApi.plugins.findIndex(
      (item) => item.name === "vuepress-theme-hope",
    );
    const pluginsAfterTheme = app.pluginApi.plugins.slice(themeIndex + 1);

    if (pluginsAfterTheme.some(({ name }) => name === pluginName))
      logger.error(
        `You are not allowed to use plugin "${colors.magenta(
          pluginName,
        )}" yourself in ${colors.cyan("vuepress config file")}. ${
          hint ||
          (optionName
            ? `Set "${colors.magenta(`plugins.${optionName}`)}" in ${colors.cyan(
                "theme options",
              )} to customize it.`
            : "")
        }`,
      );
  });
};
