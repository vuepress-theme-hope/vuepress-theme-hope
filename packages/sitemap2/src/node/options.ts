import type { Page } from "@vuepress/core";
import type { GitData } from "@vuepress/plugin-git";

export type ModifyTimeGetter = <
  ExtraPageData extends Record<string | number | symbol, unknown> & {
    git?: GitData;
  } = { git?: GitData },
  ExtraPageFrontmatter extends Record<
    string | number | symbol,
    unknown
  > = Record<never, never>,
  ExtraPageFields extends Record<string | number | symbol, unknown> = Record<
    never,
    never
  >
>(
  page: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>
) => string;

export interface SitemapOptions {
  /**
   * domain which to be deployed to
   *
   * 部署的网站域名
   */
  hostname: string;

  /**
   * Extra urls to be included
   *
   * 需要额外包含的网址
   */
  extraUrls?: string[];

  /**
   * Urls to be excluded
   *
   * 不被收录的页面
   */
  excludeUrls?: string[];

  /**
   * Output filename, relative to dest folder
   *
   * 输出的文件名，相对于输出目录
   *
   * @default 'sitemap.xml'
   */
  sitemapFilename?: string;

  /**
   * Page default update frequency
   *
   * 页面默认更新频率
   *
   * @default "daily"
   */
  changefreq?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";

  /**
   * Date format function
   *
   * 时间格式化器
   */
  modifyTimeGetter?: ModifyTimeGetter;

  /**
   * XML namespaces to turn on - all by default
   */
  xmlNameSpace?: {
    news: boolean;
    video: boolean;
    xhtml: boolean;
    image: boolean;
    custom?: string[];
  };
}
