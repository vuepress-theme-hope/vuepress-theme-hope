import { generateSiteMap } from "./generateSitemap";
import { logger } from "./utils";

import type { PluginObject } from "@vuepress/core";
import type { SitemapOptions } from "../shared";

export const sitemapPlugin = (options: SitemapOptions): PluginObject => {
  const plugin: PluginObject = {
    name: "vuepress-plugin-sitemap2",
  };

  if (!options.hostname) {
    logger.warn('"hostname" is required');

    return plugin;
  }

  return {
    ...plugin,

    onGenerated: (app): Promise<void> => generateSiteMap(app, options),
  };
};
