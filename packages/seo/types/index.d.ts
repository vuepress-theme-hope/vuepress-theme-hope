import { Page, SiteConfig, ThemeConfig } from "@mr-hope/vuepress-types";
import { SeoContent } from "./seo";

export interface PageSeoInfo {
  $page: Page;
  $site: SiteConfig;
  themeConfig: ThemeConfig | Record<string, never>;
  /** langs which are supported */
  locale: string[];
  /** Current page path */
  path: string;
}

export interface SeoOptions {
  twitterID: string;
  /** Content restrictions */
  restrictions?: string;
  /** A function to generate seo */
  seo?: (info: PageSeoInfo) => Partial<SeoContent>;
  /** a function to custom meta */
  customMeta?: (
    meta: Record<"content" | "name" | "charset" | "http-equiv", string>[],
    info: PageSeoInfo
  ) => void;
}
