import { black, blue } from "chalk";
import { generateSiteMap } from "./sitemap";

import type { Plugin } from "@vuepress/core";
import type { SitemapOptions } from "./types";

export * from "./types";

const sitemapPlugin: Plugin<SitemapOptions> = (options, app) => {
  const { themeConfig } = app.options;

  return {
    name: "sitemap",

    async generated(): Promise<void> {
      const hostname = options.hostname || (themeConfig.hostname as string);

      if (hostname) {
        const option =
          Object.keys(options).length > 0
            ? { ...options, hostname }
            : { ...((themeConfig.sitemap as SitemapOptions) || {}), hostname };

        await generateSiteMap(option, app);
      } else
        console.log(
          blue("Sitemap"),
          black.bgRed("Error"),
          'Not generating sitemap because required "hostname" option doesn\'t exist'
        );
    },

    plugins: [
      ["@mr-hope/last-update", themeConfig.lastUpdate || true],
      ["@vuepress/last-updated", false],
    ],
  };
};

export default sitemapPlugin;
