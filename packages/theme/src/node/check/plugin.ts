import type { App } from "@vuepress/core";
import { colors } from "@vuepress/utils";
import { keys } from "vuepress-shared/node";

import type { PluginsOptions } from "../../shared/index.js";
import { logger } from "../utils.js";

const PLUGIN_CHECKLIST = [
  ["@vuepress/plugin-active-header-links", "activeHeaderLinks"],
  "@vuepress/plugin-theme-data",
  ["vuepress-plugin-auto-catalog", "autoCatalog"],
  ["vuepress-plugin-blog2", "blog"],
  ["vuepress-plugin-comment2", "comment"],
  ["vuepress-plugin-components", "components"],
  ["vuepress-plugin-copy-code2", "copyCode"],
  ["vuepress-plugin-copyright2", "copyright"],
  ["vuepress-plugin-feed2", "feed"],
  ["vuepress-plugin-md-enhance", "mdEnhance"],
  ["vuepress-plugin-photo-swipe", "photoSwipe"],
  ["vuepress-plugin-pwa2", "pwa"],
  ["vuepress-plugin-reading-time2", "readingTime"],
  ["vuepress-plugin-rtl", "", 'Set "rtl: true" in the needed theme locales.'],
  ["vuepress-plugin-pwa2", "pwa"],
  ["vuepress-plugin-seo2", "seo"],
  ["vuepress-plugin-sitemap2", "sitemap"],
];

const KNOWN_THEME_PLUGINS = [
  "activeHeaderLinks",
  "autoCatalog",
  "blog",
  "components",
  "comment",
  "copyCode",
  "copyright",
  "externalLinkIcon",
  "feed",
  "git",
  "mdEnhance",
  "nprogress",
  "photoSwipe",
  "prismjs",
  "pwa",
  "readingTime",
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
            ? `Set "${colors.magenta(`plugin.${optionName}`)}" in ${colors.cyan(
                "theme options",
              )} to customize it.`
            : "")
        }`,
      );
  });
};
