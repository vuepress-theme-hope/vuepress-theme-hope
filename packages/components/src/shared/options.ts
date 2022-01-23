import type { LocaleConfig } from "@vuepress/core";
import type { BackToTopLocaleData } from "./locales";
import type { PageInfoLocaleData } from "./pageInfo";
import type { PaginationLocaleData } from "./pagination";

export interface ComponentOptions {
  /**
   * Whether enabling backToTop button
   *
   * 是否启用返回顶部按钮
   *
   * @default false
   */
  backToTop?: boolean;

  /**
   * backToTop button threshold distance (in pixels)
   *
   * 返回顶部按钮触发距离 (单位：像素)
   *
   * @default 300
   */
  backToTopThreshold?: number;

  /**
   * backToTop button Locales config
   *
   * 返回顶部按钮国际化配置
   */
  backToTopLocales?: LocaleConfig<BackToTopLocaleData>;

  /**
   * Whether register breadcrumb component
   *
   * 是否注册路径导航
   *
   * @default false
   */
  breadcrumb?: boolean;

  /**
   * Whether register badge component
   *
   * 是否注册徽章组件
   *
   * @default false
   */
  badge?: boolean;

  /**
   * Whether register pageinfo component
   *
   * 是否注册页面信息
   *
   * @default false
   */
  pageinfo?: boolean;

  /**
   * Whether register pagination component
   *
   * 是否注册分页组件
   *
   * @default false
   */
  pagination?: boolean;

  /**
   * Whether register scrennfull button component
   *
   * 是否注册全屏按钮
   *
   * @default false
   */
  screenFull?: boolean;

  /**
   * Reading speed of words per minute
   *
   * 每分钟阅读字数
   *
   * @default 300
   */
  wordPerminute?: number;

  /**
   * Locales config for pageInfo
   *
   * 页面信息的国际化配置
   */
  pageInfoLocales?: LocaleConfig<PageInfoLocaleData>;

  /**
   * Locales config for pagination
   *
   * 分页的国际化配置
   */
  paginationLocales?: LocaleConfig<PaginationLocaleData>;
}
