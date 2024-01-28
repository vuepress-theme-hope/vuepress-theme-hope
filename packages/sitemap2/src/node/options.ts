import type { GitData } from "@vuepress/plugin-git";
import type { App, Page } from "vuepress/core";

export type PageModifyTimeGetter = <
  ExtraPageData extends Record<string, unknown> & {
    git?: GitData;
  } = { git?: GitData },
  ExtraPageFrontmatter extends Record<string, unknown> = Record<never, never>,
  ExtraPageFields extends Record<string, unknown> = Record<never, never>,
>(
  page: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>,
  app: App,
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
   * @default "sitemap.xml"
   */
  sitemapFilename?: string;

  /**
   * Output xsl filename, relative to dest folder
   *
   * 输出的 xsl 文件名，相对于输出目录
   *
   * @default "sitemap.xsl"
   */
  sitemapXSLFilename?: string;

  /**
   * XSL file content used as template
   *
   * 用作模板的 XSL 文件内容
   *
   * @default "vuepress-plugin-sitemap2/templates/sitemap.xsl"
   */
  sitemapXSLTemplate?: string;

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
  modifyTimeGetter?: PageModifyTimeGetter;

  /**
   * Whether enabled in devServer
   *
   * @description For performance reasons, we do not provide hot reload. Reboot your devServer to sync your changes.
   *
   * 是否在开发服务器中启用
   *
   * @description 由于性能原因，我们不提供热更新。重启开发服务器以同步你的变更。
   *
   * @default false
   */
  devServer?: boolean;

  /**
   * Hostname to use in devServer
   *
   * 开发服务器使用的主机名
   *
   * @default 'http://localhost:${port}'
   */
  devHostname?: string;

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
