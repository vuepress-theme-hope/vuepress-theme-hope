import { getBlogOptions } from "./blog";

import type { Page } from "@vuepress/core";
import type { SeoOptions } from "vuepress-plugin-seo2";
import type { HopeThemeConfig, HopeThemePluginsOptions } from "../../shared";

export const resolveSEOOptions = (
  themeConfig: HopeThemeConfig,
  { blog, seo }: HopeThemePluginsOptions
): SeoOptions | false => {
  if (seo === false) return false;

  // disable feed if `hostname` is not set and no options for feed plugin
  if (!Object.keys(seo || {}).length && !themeConfig.hostname) return false;

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

  return {
    hostname: themeConfig.hostname,
    isArticle,
    ...(seo || {}),
  } as SeoOptions;
};
