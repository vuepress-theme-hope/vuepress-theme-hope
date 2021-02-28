import type { Page, SiteConfig, ThemeConfig } from "@mr-hope/vuepress-types";
import type { SeoContent } from "./seo";

export type * from "./seo";

export interface PageSeoInfo {
  /** Current Page Object */
  page: Page;
  /** Vuepress Config  */
  site: SiteConfig;
  /** Current ThemeConfig */
  themeConfig: ThemeConfig | Record<string, never>;
  /** langs which are supported */
  locale: string[];
  /** Current page path */
  path: string;
}

export interface SeoOptions {
  /**
   * 默认作者
   *
   * default author
   */
  author?: string;
  /**
   * 你的 Twitter 用户名
   *
   * your twitter username
   */
  twitterID?: string;
  /**
   * 内容分级情况
   *
   * Content restrictions
   *
   * The age rating of the content, the format is `[int]+`, such as `'13+'`
   */
  restrictions?: string;

  /** A function to generate seo */
  seo?: (info: PageSeoInfo) => Partial<SeoContent>;
  /** a function to custom meta */
  customMeta?: (
    meta: Record<"content" | "name" | "charset" | "http-equiv", string>[],
    info: PageSeoInfo
  ) => void;
}
