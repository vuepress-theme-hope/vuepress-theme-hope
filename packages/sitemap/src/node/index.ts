import { black, blue } from "chalk";
import { genSiteMap } from "./sitemap";

import { Context, PluginOptionAPI } from "@mr-hope/vuepress-types";
import { SitemapOptions } from "../types";

export = (options: SitemapOptions, context: Context): PluginOptionAPI => {
  const { themeConfig } = context;

  return {
    name: "sitemap",

    async generated(): Promise<void> {
      const hostname = options.hostname || themeConfig.hostname;

      if (hostname) {
        const option =
          Object.keys(options).length > 0
            ? { ...options, hostname: hostname }
            : themeConfig.sitemap
            ? { ...themeConfig.sitemap, hostname: hostname }
            : { hostname: hostname };

        await genSiteMap(option, context);
      } else
        console.log(
          blue("Sitemap"),
          black.bgRed("error"),
          'Not generating sitemap because required "hostname" option doesn\'t exist'
        );
    },

    plugins: [
      ["@mr-hope/last-update", themeConfig.lastUpdate || true],
      ["@vuepress/last-updated", false],
    ],
  };
};
