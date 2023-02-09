import { type PluginFunction, type PluginObject } from "@vuepress/core";
import { colors } from "@vuepress/utils";

import { convertOptions } from "./compact/index.js";
import { generateSiteMap } from "./generateSitemap.js";
import { type SitemapOptions } from "./options.js";
import { logger } from "./utils.js";

export const sitemapPlugin =
  (options: SitemapOptions, legacy = true): PluginFunction =>
  (app) => {
    // TODO: Remove this in v2 stable
    if (legacy)
      convertOptions(options as SitemapOptions & Record<string, unknown>);
    if (app.env.isDebug) logger.info("Options:", options);

    const plugin: PluginObject = {
      name: "vuepress-plugin-sitemap2",
    };

    if (!options.hostname) {
      logger.error(`Option ${colors.magenta("hostname")} is required!`);

      return plugin;
    }

    return {
      ...plugin,

      onGenerated: (app): Promise<void> => generateSiteMap(app, options),
    };
  };
