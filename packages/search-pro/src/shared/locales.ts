import type { ConvertLocaleConfig } from "vuepress-shared";

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
   * Close text
   *
   * 关闭文字
   */
  close: string;

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
}

export type SearchProLocaleConfig = ConvertLocaleConfig<SearchProLocaleData>;
