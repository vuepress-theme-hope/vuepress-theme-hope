import type { LocaleConfig } from "@vuepress/core";
import type { ArticleInfoLocaleData, BackToTopLocaleData } from "./locales";

export type AvailableComponent = "ArticleInfo" | "Badge";

export interface ComponentOptions {
  /**
   * Components to be registered
   *
   * 需要被注册的组件
   *
   * @default []
   */
  components: AvailableComponent[];

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
}
