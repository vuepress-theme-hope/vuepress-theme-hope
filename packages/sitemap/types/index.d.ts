import { PageComputed } from 'vuepress-types';

/** Sitemap 配置选项 */
export interface SitemapOptions {
  /** 需要额外包含的网址 */
  urls?: { url: string }[];
  /** 不被收录的页面 */
  exclude: string[];
  /** 输出的文件名 */
  outFile?: string;
  /** 更新频率 */
  changefreq?: string;
  /** 网站域名 */
  hostname: string;
  /** 时间格式化器 */
  dateFormatter: ($page: PageComputed) => string;
  cacheTime?: number;

  xslUrl?: any;
  xmlNs?: any;

  [props: string]: any;
}
