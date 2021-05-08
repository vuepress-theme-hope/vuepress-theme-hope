import { black, blue } from "chalk";
import { genSiteMap } from "./sitemap";

import type { Plugin } from "@mr-hope/vuepress-types";
import type { SitemapOptions } from "../types";

const sitemapPlugin: Plugin<SitemapOptions> = (options, context) => {
  const { themeConfig } = context;

  return {
    name: "sitemap",

    async generated(): Promise<void> {
      const hostname = options.hostname || themeConfig.hostname;

      if (hostname) {
        const option =
          Object.keys(options).length > 0
            ? { ...options, hostname }
            : { ...(themeConfig.sitemap || {}), hostname };

        await genSiteMap(option, context);
      } else
        console.log(
          blue("Sitemap"),
          black.bgRed("Error"),
          'Not generating sitemap because required "hostname" option doesn’t exist'
        );
    },

    plugins: [["@mr-hope/git", themeConfig.git || true]],
  };
};

export = sitemapPlugin;
