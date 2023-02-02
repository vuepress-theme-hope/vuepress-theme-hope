import { type Author } from "vuepress-shared";

export interface InfoOptions {
  /**
   * Site favicon
   *
   * 站点图标
   */
  favicon?: string;

  /**
   * Global default author
   *
   * 全局默认作者
   */
  author?: Author;

  /**
   * domain which to be deployed to
   *
   * 网站部署域名
   */
  hostname?: string;
}
