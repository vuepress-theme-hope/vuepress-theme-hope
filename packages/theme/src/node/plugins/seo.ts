import { seo as seoPlugin } from "vuepress-plugin-seo2";
import { getBlogOptions } from "./blog";

import type { Page, PluginConfig } from "@vuepress/core";
import type { SeoOptions } from "vuepress-plugin-seo2";
import type { HopeThemeConfig, HopeThemePluginsOptions } from "../../shared";

export const resolveSEOPlugin = (
  themeConfig: HopeThemeConfig,
  { blog, seo }: HopeThemePluginsOptions
): PluginConfig => {
  if (seo === false) return ["", false];

  // disable seo if `hostname` is not set and no options for seo plugin
  if (!Object.keys(seo || {}).length && !themeConfig.hostname)
    return ["", false];

  const blogOptions = getBlogOptions(blog);

  const isArticle = ({
    filePathRelative,
    frontmatter,
    pathLocale,
    path,
  }: Page): boolean => {
    if (!filePathRelative || frontmatter.home) return false;

    const localePath = path.replace(new RegExp(`^${pathLocale}`), "/");

    return Object.keys(blogOptions).every(
      (path) => !localePath.startsWith(path)
    );
  };

  return seoPlugin({
    hostname: themeConfig.hostname,
    author: themeConfig.author,
    isArticle,
    ...(seo || {}),
  } as SeoOptions);
};
