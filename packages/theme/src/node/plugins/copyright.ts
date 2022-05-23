import { copyrightPlugin } from "vuepress-plugin-copyright2";
import { getAuthor } from "vuepress-shared";

import type { Page, Plugin } from "@vuepress/core";
import type { CopyrightOptions } from "vuepress-plugin-copyright2";
import type {
  HopeThemeConfig,
  HopeThemeNormalPageFrontmatter,
} from "../../shared";

export const getCopyrightPlugin = (
  themeConfig: HopeThemeConfig,
  options?: Partial<CopyrightOptions> | true,
  hostname?: string
): Plugin | null => {
  if (!options) return null;

  return copyrightPlugin({
    hostname,
    author: (
      page: Page<Record<string, never>, HopeThemeNormalPageFrontmatter>
    ) =>
      getAuthor(page.frontmatter.author)?.[0]?.name ||
      getAuthor(themeConfig.author)?.[0]?.name ||
      "",
    ...(typeof options === "object" ? options : { global: true }),
  } as CopyrightOptions);
};
