import { resolvePagePermalink } from "@vuepress/core";
import { generateRobotsTxt, generateSeo } from "./seo";
import { appendSEO } from "./appendHead";

import type { Plugin } from "@vuepress/core";
import type { ExtendPage, PageSeoInfo, SeoContent, SeoOptions } from "./types";

export * from "./types";

export const seoPlugin: Plugin<SeoOptions> = (options, app) => {
  const { base, themeConfig } = app.options;

  const seoOptions =
    Object.keys(options).length > 0
      ? options
      : (themeConfig.seo as SeoOptions) || {};

  return {
    name: "seo2",

    extendsPageData(page): Record<string, unknown> {
      const meta = page.frontmatter.head || [];
      const pageSeoInfo: PageSeoInfo = {
        page: page as ExtendPage,
        app,
        permalink: resolvePagePermalink(page),
      };
      const metaContext: SeoContent = {
        ...generateSeo(seoOptions, base, pageSeoInfo),
        ...(seoOptions.seo ? seoOptions.seo(pageSeoInfo) : {}),
      };

      appendSEO(meta, metaContext, seoOptions);
      if (seoOptions.customHead) seoOptions.customHead(meta, pageSeoInfo);

      return { frontmatter: { ...page.frontmatter, head: meta } };
    },

    async onGenerated(): Promise<void> {
      await generateRobotsTxt(app.dir);
    },
  };
};

export default seoPlugin;
