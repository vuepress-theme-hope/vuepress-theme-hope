import { keys } from "@vuepress/helper";
import { colors } from "vuepress/utils";

import type { PluginsOptions } from "../../shared/index.js";
import { logger } from "../utils.js";

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
  "watermark",
];

/**
 * @private
 *
 * Check theme plugin options for noob users
 */
export const checkPluginsOptions = (plugins: PluginsOptions): void => {
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
