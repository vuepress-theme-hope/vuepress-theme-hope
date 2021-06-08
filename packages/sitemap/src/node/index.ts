import { error } from "@mr-hope/vuepress-shared";
import { generateSiteMap } from "./sitemap";

import type { Plugin } from "@vuepress/core";
import type { SitemapOptions } from "./types";

export * from "./types";

const sitemapPlugin: Plugin<SitemapOptions> = (options, app) => {
  const { themeConfig } = app.options;

  return {
    name: "sitemap",

    async onGenerated(): Promise<void> {
      const hostname = options.hostname || (themeConfig.hostname as string);

      if (hostname) {
        const option =
          Object.keys(options).length > 0
            ? { ...options, hostname }
            : { ...((themeConfig.sitemap as SitemapOptions) || {}), hostname };

        await generateSiteMap(option, app);
      } else error("Required 'hostname' option is missing!", "Sitemap");
    },
  };
};

export default sitemapPlugin;
