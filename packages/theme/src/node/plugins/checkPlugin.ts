import { type App } from "@vuepress/core";
import { colors } from "@vuepress/utils";
import { keys } from "vuepress-shared/node";

import { type PluginsOptions } from "../../shared/index.js";
import { logger } from "../utils.js";

const PLUGIN_CHECKLIST = [
  ["@vuepress/plugin-active-header-links", "activeHeaderLinks"],
  "@vuepress/plugin-theme-data",
  ["vuepress-plugin-comment2", "comment"],
  ["vuepress-plugin-components", "components"],
  ["vuepress-plugin-copy-code2", "copyCode"],
  ["vuepress-plugin-copyright2", "copyright"],
  ["vuepress-plugin-feed2", "feed"],
  ["vuepress-plugin-md-enhance", "mdEnhance"],
  ["vuepress-plugin-photo-swipe", "photoSwipe"],
  ["vuepress-plugin-pwa2", "pwa"],
  ["vuepress-plugin-seo2", "seo"],
  ["vuepress-plugin-sitemap", "sitemap"],
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
 * Check plugin options for noob users
 */
export const checkPlugins = (app: App, plugins: PluginsOptions): void => {
  PLUGIN_CHECKLIST.forEach(([pluginName, optionName = ""]) => {
    if (app.pluginApi.plugins.some(({ name }) => name === pluginName))
      logger.error(
        `Plugin "${colors.magenta(
          pluginName
        )}" is used by theme, so you are not allowed to call this plugin yourself in ${colors.cyan(
          "vuepress config file"
        )} . ${
          optionName
            ? `Set "${colors.magenta(`plugin.${optionName}`)}" in ${colors.cyan(
                "theme options"
              )}, to customize it.`
            : ""
        }`
      );
  });

  keys(plugins).forEach((key) => {
    if (!KNOWN_THEME_PLUGINS.includes(key))
      logger.warn(
        `You are setting "${colors.magenta(
          `plugins.${key}`
        )}" option in ${colors.cyan(
          "theme options"
        )}, but it's not supported by theme. You need to install the plugin yourself and import then call it manually in "${colors.magenta(
          "plugins"
        )}" options in ${colors.cyan("vuepress config file")} directly.`
      );
  });
};
