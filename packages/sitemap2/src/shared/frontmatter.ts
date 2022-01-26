import type {
  SitemapImageOption,
  SitemapNewsOption,
  SitemapVideoOption,
} from "./sitemap";

export interface SitemapFrontmatterOption {
  /**
   * Update Frequency
   *
   * 更新频率
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
   * Whether to exclude this page from sitemap
   *
   * 是否不包含此页面
   */
  exclude?: boolean;

  /**
   * Priority of this page, supports 0.0 -1.0
   *
   * 页面优先级，0.0 - 1.0
   */
  priority?: number;

  /**
   * Image config
   *
   * 图片配置
   */
  img?: SitemapImageOption[];

  /**
   * Video config
   *
   * 视频配置
   */
  video?: SitemapVideoOption[];

  /**
   * News config
   *
   * 新闻配置
   */
  news?: SitemapNewsOption[];
}
