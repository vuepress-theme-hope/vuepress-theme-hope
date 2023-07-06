import type { Page, PageFrontmatter } from "@vuepress/core";
import type { GitData } from "@vuepress/plugin-git";

import type { SEOPluginFrontmatter } from "./frontmatter.js";

export interface SeoPluginPageData
  extends Record<string | number | symbol, unknown> {
  autoDesc?: true;
  excerpt?: string;
  git?: GitData;
}

export type ExtendPage<
  ExtraPageData extends Record<string | number | symbol, unknown> &
    Partial<SeoPluginPageData> = SeoPluginPageData,
  ExtraPageFrontmatter extends
    PageFrontmatter<SEOPluginFrontmatter> = PageFrontmatter<SEOPluginFrontmatter>,
  ExtraPageFields extends Record<string | number | symbol, unknown> = Record<
    never,
    never
  >,
> = Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>;
