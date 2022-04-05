import { getAuthor } from "@mr-hope/vuepress-shared";
import { copyright } from "vuepress-plugin-copyright2";
import type { Page, PluginConfig } from "@vuepress/core";
import type { CopyrightOptions } from "vuepress-plugin-copyright2";
import type {
  HopeThemeConfig,
  HopeThemeNormalPageFrontmatter,
} from "../../shared";

export const resolveCopyrightPlugin = (
  hostname: string,
  themeConfig: HopeThemeConfig,
  options?: Partial<CopyrightOptions> | true
): PluginConfig => {
  if (!options) return ["", false];

  return copyright({
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
