import type { ExactLocaleConfig } from "@vuepress/helper";

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
   * Default title
   *
   * 默认标题
   */
  defaultTitle: string;

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
   * Autocomplete hint
   *
   * 自动补全提示
   */
  autocomplete: string;

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
   * Search query history title
   *
   * 搜索文字历史 标题
   */
  queryHistory: string;

  /**
   * Search result history title
   *
   * 搜索结果历史 标题
   */
  resultHistory: string;

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

export type SearchProLocaleConfig = ExactLocaleConfig<SearchProLocaleData>;
