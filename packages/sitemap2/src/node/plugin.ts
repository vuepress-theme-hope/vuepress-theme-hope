import { chalk } from "@vuepress/utils";
import { generateSiteMap } from "./generateSitemap";
import { logger } from "./utils";

import type { PluginObject, PluginFunction } from "@vuepress/core";
import type { SitemapOptions } from "../shared";

export const sitemapPlugin =
  (options: SitemapOptions): PluginFunction =>
  (app) => {
    if (app.env.isDebug) logger.info(`Options: ${options.toString()}`);

    const plugin: PluginObject = {
      name: "vuepress-plugin-sitemap2",
    };

    if (!options.hostname) {
      logger.error(`Option ${chalk.magenta("hostname")} is required!`);

      return plugin;
    }

    return {
      ...plugin,

      onGenerated: (app): Promise<void> => generateSiteMap(app, options),
    };
  };
