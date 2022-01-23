import { resolvePagePermalink } from "@vuepress/core";
import { generateRobotsTxt, generateSeo } from "./seo";
import { appendSEO } from "./inject";
import { logger } from "./utils";

import type { Plugin } from "@vuepress/core";
import type { ExtendPage, PageSeoInfo, SeoContent, SeoOptions } from "./types";

export * from "./types";

export const seoPlugin: Plugin<SeoOptions> = (options, app) => {
  if (!options.hostname) {
    logger.error('Required option "hostname" is missing');

    return { name: "vuepress-plugin-seo2" };
  }

  return {
    name: "vuepress-plugin-seo2",

    extendsPage(page): void {
      const head = page.frontmatter.head || [];
      const pageSeoInfo: PageSeoInfo = {
        page: page as ExtendPage,
        app,
        permalink: resolvePagePermalink(page),
      };
      const { OGP, JSONLD } = generateSeo(options as SeoOptions, pageSeoInfo);
      const metaContext: SeoContent = {
        ...OGP,
        ...(options.ogp ? options.ogp(pageSeoInfo) : {}),
      };

      appendSEO(head, metaContext, options as SeoOptions);
      if (JSONLD)
        head.push([
          "script",
          { type: "application/ld+json" },
          JSON.stringify(JSONLD),
        ]);
      if (options.customHead) options.customHead(head, pageSeoInfo);

      page.frontmatter.head = head;
    },

    async onGenerated(): Promise<void> {
      await generateRobotsTxt(app.dir);
    },
  };
};

export default seoPlugin;
