import type { RequiredLocaleConfig } from "vuepress-shared";

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

export type AutoCatalogLocaleConfig =
  RequiredLocaleConfig<AutoCatalogLocaleData>;
