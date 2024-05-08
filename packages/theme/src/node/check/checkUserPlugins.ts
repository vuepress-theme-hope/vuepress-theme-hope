import type { App } from "vuepress/core";
import { colors } from "vuepress/utils";

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
  ["@vuepress/plugin-watermark", "watermark"],
  ["vuepress-plugin-components", "components"],
  ["vuepress-plugin-md-enhance", "mdEnhance"],
  ["vuepress-plugin-search-pro", "searchPro"],
];

/**
 * @private
 *
 * Check user plugin options for noob users
 */
export const checkUserPlugins = (app: App): void => {
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
