import type { LocaleConfig, Page } from "@vuepress/core";
import type { SearchProLocaleData } from "./locales.js";

export type SearchProCustomFieldFormater = string | Record<string, string>;

export interface SearchProCustomFieldOptions {
  /**
   * Name of the custom field
   *
   * 自定义项目的名称
   */
  name: string;

  /**
   * Custom field getter
   *
   * 自定义项目的获取器
   */
  getter: (page: Page) => string | string[] | null;

  /**
   * Display content
   *
   * @description `$content` will be replaced by the content returned by `getter`
   *
   * 展示的内容
   *
   * @description `$content` 会被 `getter` 返回的内容替换
   *
   * @default `$content`
   */
  formatter?: SearchProCustomFieldFormater;
}

export type SearchProClientCustomFiledConfig = Record<
  string,
  SearchProCustomFieldFormater
>;

// TODO: Add hotkey
export interface SearchProOptions {
  /**
   * Whether index full text
   *
   * 是否开启全文索引
   *
   * @default false
   */
  fullIndex?: boolean;

  /**
   * Whether enable hmr
   *
   * 是否启用 hmr
   *
   * @default false
   */
  hotReload?: boolean;

  /**
   * Custom field for search
   */
  customFields?: SearchProCustomFieldOptions[];

  /**
   * Locales config
   *
   * @see [default config](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/search-pro/src/node/locales.ts)
   *
   * 多语言选项
   *
   * @see [默认配置](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/search-pro/src/node/locales.ts)
   */
  locales?: LocaleConfig<SearchProLocaleData>;
}
