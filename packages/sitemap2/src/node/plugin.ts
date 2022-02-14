import { logger } from "@vuepress/utils";
import { generateSiteMap } from "./generateSitemap";

import type { Plugin, PluginConfig, PluginObject } from "@vuepress/core";
import type { SitemapOptions } from "../shared";

export const sitemapPlugin: Plugin<SitemapOptions> = (options, app) => {
  const plugin: PluginObject = {
    name: "vuepress-plugin-sitemap2",
  };

  if (!options.hostname) {
    logger.warn(`[${plugin.name}] 'hostname' is required`);

    return plugin;
  }

  return {
    ...plugin,

    async onGenerated(): Promise<void> {
      await generateSiteMap(app, options as SitemapOptions);
    },
  };
};

export const sitemap = (
  options: SitemapOptions | false
): PluginConfig<SitemapOptions> => ["sitemap2", options];
