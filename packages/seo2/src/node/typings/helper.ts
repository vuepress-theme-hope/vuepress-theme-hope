import type { Page, PageFrontmatter } from "@vuepress/core";
import type { GitData } from "@vuepress/plugin-git";
import type { BasePageFrontMatter } from "vuepress-shared/node";

export interface SeoPluginPageData {
  autoDesc?: boolean;
}

export type ExtendPage<
  ExtraPageData extends Record<string | number | symbol, unknown> & {
    autoDesc?: true;
    excerpt?: string;
    git?: GitData;
  } = { autoDesc?: true; excerpt?: string; git?: GitData },
  ExtraPageFrontmatter extends PageFrontmatter<
    BasePageFrontMatter & { banner: string; cover: string }
  > = PageFrontmatter<BasePageFrontMatter & { banner: string; cover: string }>,
  ExtraPageFields extends Record<string | number | symbol, unknown> = Record<
    never,
    never
  >
> = Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>;
