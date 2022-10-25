import type { LocaleConfig } from "@vuepress/core";
import type { BackToTopLocaleData } from "./locales.js";

export type AvailableComponent =
  | "Badge"
  | "BiliBili"
  | "Catalog"
  | "CodePen"
  | "FontIcon"
  | "PDF"
  | "StackBlitz"
  | "VideoPlayer"
  | "YouTube";

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
   * Add This 的公开 ID
   *
   * Public ID for add this
   *
   * @default false
   */
  addThis?: string | false;

  /**
   * Whether enabling backToTop button
   *
   *
   * @description When setting a number, it will be used as backToTop button threshold distance (in pixels)
   *
   * 是否启用返回顶部按钮
   *
   * @description 当设置为数字时，将会作为返回顶部按钮距离阈值 (单位: 像素)
   *
   * @default false
   */
  backToTop?: number | boolean;

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
   * @description `'iconfont'` and `'fontawesome'` keywords are supported
   */
  iconAssets?:
    | "iconfont"
    | "fontawesome"
    | `//${string}`
    | `http://${string}`
    | `https://${string}`;

  /**
   * Class prefix of font icon
   *
   * 字体图标的 Class 前缀
   *
   * @default ''
   */
  iconPrefix?: string;
}
