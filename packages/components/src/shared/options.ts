import type { LocaleConfig } from "@vuepress/core";
import type { BackToTopLocaleData } from "./locales";

export type AvailableComponent = "Badge" | "CodePen" | "FontIcon" | "PDF";

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
   * backToTop button Locales config
   *
   * 返回顶部按钮国际化配置
   */
  backToTopLocales?: LocaleConfig<BackToTopLocaleData>;

  /**
   * Link of font icon asset
   *
   * 字体图标资源链接
   *
   * @description `'iconfont'` and `'font-awesome'` keywords are supported
   */
  fontIconAssets?: string;

  /**
   * Class prefix of font icon
   *
   * 字体图标的 Class 前缀
   *
   * @default ''
   */
  fontIconPrefix?: string;
}
