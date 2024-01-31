import type { ExactLocaleConfig } from "@vuepress/helper/shared";

export interface AutoCatalogLocaleData {
  /**
   * Catalog title text
   *
   * 目录标题文字
   */
  title: string;

  /**
   * Empty hint
   *
   * 空目录提示
   */
  empty: string;
}

export type AutoCatalogLocaleConfig = ExactLocaleConfig<AutoCatalogLocaleData>;
