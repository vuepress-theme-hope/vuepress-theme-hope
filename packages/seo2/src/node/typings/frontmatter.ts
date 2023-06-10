import type { BasePageFrontMatter } from "vuepress-shared/node";

export interface SEOPluginFrontmatter extends BasePageFrontMatter {
  /**
   * Whether inject seo information for current page
   *
   * @default true
   */
  seo?: boolean;
}
