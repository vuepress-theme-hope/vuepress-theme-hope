import { colors } from "@vuepress/utils";
import { logger } from "../utils.js";

import type { App } from "@vuepress/core";
import type { PluginsOptions } from "../../shared/index.js";

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
 * Check plugin options for noob users
 *
 * @description Should be invoke on node side
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

  Object.keys(plugins).forEach((key) => {
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

/**
 * Composition Api to remove `@vuepress/plugin-git`
 *
 * @description Should be invoke on node side
 */
export const removeGitPlugin = (app: App): void => {
  const { plugins } = app.pluginApi;

  const index = plugins.findIndex(
    (plugin) => plugin.name === "@vuepress/plugin-git"
  );

  if (index !== -1) app.pluginApi.plugins.splice(index, 1);
};
