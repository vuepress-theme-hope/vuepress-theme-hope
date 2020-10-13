import { generateSeo } from "./genSeo";
import { appendMeta } from "./meta";

import {
  Context,
  PluginOptionAPI,
  ThemeConfig,
  Page,
} from "@mr-hope/vuepress-types";
import { PageSeoInfo, SeoOptions } from "../types";
import { SeoContent } from "../types/seo";

const getLocales = ({ locales = {} }: ThemeConfig): string[] => {
  const langs: string[] = [];
  for (const path in locales)
    if (locales[path].lang) langs.push(locales[path].lang as string);

  return langs;
};

export = (options: SeoOptions, context: Context): PluginOptionAPI => ({
  name: "seo",

  extendPageData($page): void {
    const $site = context.getSiteData();
    const meta = $page.frontmatter.meta || [];

    // In Vuepress core, permalinks are built after enhancers.
    const pageClone = Object.assign(
      Object.create(Object.getPrototypeOf($page)) as Page,
      $page
    );
    pageClone.buildPermalink();

    const pageSeoInfo: PageSeoInfo = {
      $page,
      $site,
      themeConfig: $site.themeConfig || {},
      locale: getLocales($site.themeConfig),
      path: pageClone.path,
    };
    const metaContext: SeoContent = {
      ...generateSeo(options, pageSeoInfo),
      ...(options.seo ? options.seo(pageSeoInfo) : {}),
    };

    appendMeta(meta, metaContext, options);
    if (options.customMeta) options.customMeta(meta, pageSeoInfo);

    $page.frontmatter.meta = meta;
  },

  plugins: ["@mr-hope/last-update", ["@vuepress/last-updated", false]],
});
