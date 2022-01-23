import { generateSiteMap, logger } from "./sitemap";

import type { Plugin } from "@vuepress/core";
import type { SitemapOptions } from "./types";

export * from "./types";

const sitemapPlugin: Plugin<SitemapOptions> = (options, app) => {
  if (!options.hostname) {
    logger.error("Required 'hostname' option is missing!");

    return { name: "vuepress-plugin-sitemap2" };
  }

  return {
    name: "vuepress-plugin-sitemap2",

    async onGenerated(): Promise<void> {
      await generateSiteMap(options as SitemapOptions, app);
    },
  };
};

export default sitemapPlugin;
