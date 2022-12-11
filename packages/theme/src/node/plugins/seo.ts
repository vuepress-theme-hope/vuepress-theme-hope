import { seoPlugin } from "vuepress-plugin-seo2";

import type { Page, Plugin } from "@vuepress/core";
import type { ThemeData, PluginsOptions } from "../../shared/index.js";

export const getSEOPlugin = (
  themeData: ThemeData,
  { seo }: PluginsOptions,
  hostname = "",
  legacy = false
): Plugin | null => {
  if (seo === false) return null;
  const seoOptions = typeof seo === "object" ? seo : {};

  // disable seo if `hostname` is not set and no options for seo plugin
  if (!Object.keys(seoOptions).length && !hostname) return null;

  return seoPlugin(
    {
      hostname,
      ...(themeData.author ? { author: themeData.author } : {}),
      isArticle: ({ filePathRelative, frontmatter }: Page): boolean =>
        Boolean(filePathRelative) &&
        !frontmatter["home"] &&
        frontmatter["article"] !== false,
      ...seoOptions,
    },
    legacy
  );
};
