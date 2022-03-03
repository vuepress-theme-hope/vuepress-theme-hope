import type { LocaleConfig } from "@vuepress/core";
import type {
  ArticleInfoLocaleData,
  BackToTopLocaleData,
  PaginationLocaleData,
  TOCLocaleData,
} from "./locales";

export interface ComponentOptions {
  /**
   * Whether register article info component
   *
   * 是否注册文章信息
   *
   * @default false
   */
  articleInfo?: boolean;

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
   * Whether register scrennfull button component
   *
   * 是否注册全屏按钮
   *
   * @default false
   */
  fullScreen?: boolean;

  /**
   * Whether register pagination component
   *
   * 是否注册分页组件
   *
   * @default false
   */
  pagination?: boolean;

  /**
   * Whether register toc component
   *
   * 是否注册 TOC 组件
   *
   * @default false
   */
  toc?: boolean;

  /**
   * Locales config for articleInfo
   *
   * 文章信息的国际化配置
   */
  articleInfoLocales?: LocaleConfig<ArticleInfoLocaleData>;

  /**
   * backToTop button Locales config
   *
   * 返回顶部按钮国际化配置
   */
  backToTopLocales?: LocaleConfig<BackToTopLocaleData>;

  /**
   * Locales config for TOC
   *
   * 标题列表的国际化配置
   */
  tocLocales?: LocaleConfig<TOCLocaleData>;

  /**
   * Locales config for pagination
   *
   * 分页的国际化配置
   */
  paginationLocales?: LocaleConfig<PaginationLocaleData>;
}
