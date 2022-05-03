import { seoPlugin } from "vuepress-plugin-seo2";
import { getBlogOptions } from "./blog";

import type { Page, Plugin } from "@vuepress/core";
import type { SeoOptions } from "vuepress-plugin-seo2";
import type { HopeThemeConfig, HopeThemePluginsOptions } from "../../shared";

export const getSEOPlugin = (
  hostname: string,
  themeConfig: HopeThemeConfig,
  { blog, seo }: HopeThemePluginsOptions
): Plugin | null => {
  if (seo === false) return null;

  // disable seo if `hostname` is not set and no options for seo plugin
  if (!Object.keys(seo || {}).length && !hostname) return null;

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

  const seoOptions: SeoOptions = {
    hostname,
    author: themeConfig.author,
    isArticle,
    ...(seo || {}),
  };

  return seoPlugin(seoOptions);
};
