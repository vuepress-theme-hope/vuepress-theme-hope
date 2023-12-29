import type { Page } from "@vuepress/core";
import type { GitData } from "@vuepress/plugin-git";

import type { SEOPluginFrontmatter } from "./frontmatter.js";

export interface SeoPluginPageData {
  autoDesc?: true;
  excerpt?: string;
  git?: GitData;
}

export type ExtendPage<
  ExtraPageData extends Record<string, unknown> = Record<never, never>,
  ExtraPageFrontmatter extends Record<string, unknown> = Record<
    string,
    unknown
  >,
  ExtraPageFields extends Record<string, unknown> = Record<never, never>,
> = Page<
  ExtraPageData & SeoPluginPageData,
  ExtraPageFrontmatter & SEOPluginFrontmatter,
  ExtraPageFields
>;
