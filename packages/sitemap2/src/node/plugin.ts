import { chalk } from "@vuepress/utils";
import { convertOptions } from "./compact/index.js";
import { generateSiteMap } from "./generateSitemap.js";
import { logger } from "./utils.js";

import type { PluginObject, PluginFunction } from "@vuepress/core";
import type { SitemapOptions } from "../shared/index.js";

export const sitemapPlugin =
  (options: SitemapOptions, legacy = false): PluginFunction =>
  (app) => {
    // TODO: Remove it in v2 stable
    if (legacy)
      convertOptions(options as SitemapOptions & Record<string, unknown>);
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
