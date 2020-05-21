import { Page, SiteConfig, ThemeConfig } from "vuepress-types";
import { SeoContent } from "./seo";

export interface PageSeoInfo {
  /** 页面对象 */
  $page: Page;
  /** 站点对象 */
  $site: SiteConfig;
  /** 主题配置 */
  themeConfig: ThemeConfig;
  /** 当前支持的语言列表 */
  locale: string[];
  /** 当前页面地址 */
  path: string;
}

export interface SeoOptions {
  /** twitter 用户名 */
  twitterID: string;
  /** 内容年龄分级 */
  restrictions?: string;
  /** 自定义 SEO */
  seo?: (info: PageSeoInfo) => Partial<SeoContent>;
  /** 自定义 Meta */
  customMeta?: (
    meta: Record<"content" | "name" | "charset" | "http-equiv", string>[],
    info: PageSeoInfo
  ) => void;
}
