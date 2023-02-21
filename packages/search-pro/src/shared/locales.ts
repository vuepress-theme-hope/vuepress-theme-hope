import { type RequiredLocaleConfig } from "vuepress-shared";

/**
 * Multi language config for `vuepress-plugin-search-pro` plugin
 *
 * `vuepress-plugin-search-pro` 插件的多语言配置
 */
export interface SearchProLocaleData {
  /**
   * Search box placeholder
   *
   * 搜索框占位符文字
   */
  placeholder: string;

  /**
   * Search text
   *
   * 搜素文字
   */
  search: string;

  /**
   * Searching text
   *
   * 搜素中文字
   */
  searching: string;

  /**
   * Cancel text
   *
   * 取消文字
   */
  cancel: string;

  /**
   * Select hint
   *
   * 选择提示
   */
  select: string;

  /**
   * Choose hint
   *
   * 选择提示
   */
  navigate: string;

  /**
   * Close hint
   *
   * 关闭提示
   */
  exit: string;

  /**
   * Loading hint
   *
   * 加载提示
   */
  loading: string;

  /**
   * Search history text
   *
   * 搜索历史文字
   */
  history: string;

  /**
   * Search history empty hint
   *
   * 无搜索历史提示
   */
  emptyHistory: string;

  /**
   * Empty hint
   *
   * 无结果提示
   */
  emptyResult: string;
}

export type SearchProLocaleConfig = RequiredLocaleConfig<SearchProLocaleData>;
