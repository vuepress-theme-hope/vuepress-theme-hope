import type { RequiredLocaleConfig } from "vuepress-shared";

export interface BackToTopLocaleData {
  /**
   * Back to top button label text
   *
   * 返回顶部文字
   */
  backToTop: string;
}

export type BackToTopLocaleConfig = RequiredLocaleConfig<BackToTopLocaleData>;

export interface CatalogLocaleData {
  /**
   * Catalog title text
   *
   * 目录标题文字
   */
  title: string;
}

export type CatalogLocaleConfig = RequiredLocaleConfig<CatalogLocaleData>;
