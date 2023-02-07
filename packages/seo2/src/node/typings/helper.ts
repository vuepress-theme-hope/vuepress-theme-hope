import { type Page, type PageFrontmatter } from "@vuepress/core";
import { type GitData } from "@vuepress/plugin-git";

import { SEOPluginFrontmatter } from "./frontmatter.js";

export interface SeoPluginPageData {
  autoDesc?: boolean;
}

export type ExtendPage<
  ExtraPageData extends Record<string | number | symbol, unknown> & {
    autoDesc?: true;
    excerpt?: string;
    git?: GitData;
  } = { autoDesc?: true; excerpt?: string; git?: GitData },
  ExtraPageFrontmatter extends PageFrontmatter<SEOPluginFrontmatter> = PageFrontmatter<SEOPluginFrontmatter>,
  ExtraPageFields extends Record<string | number | symbol, unknown> = Record<
    never,
    never
  >
> = Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>;
