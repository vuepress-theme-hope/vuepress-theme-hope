import type { LocaleConfig } from "@vuepress/core";
import type { BackToTopLocaleData, NoticeOptions } from "../shared/index.js";

export type AvailableComponent =
  | "AudioPlayer"
  | "Badge"
  | "BiliBili"
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
  components?: AvailableComponent[];

  /**
   * Global config for components
   *
   * 组件全局配置
   */
  componentOptions?: {
    /**
     * 图标配置
     */
    fontIcon?: {
      /**
       * Link of font icon asset
       *
       * 字体图标资源链接
       *
       * @description `'iconfont'` and `'fontawesome'` keywords are supported
       */
      assets?:
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
      prefix?: string;
    };
  };

  rootComponents?: {
    /**
     * Add This 的公开 ID
     *
     * Public ID for add this
     */
    addThis?: string;

    /**
     * Whether enabling backToTop button
     *
     *
     * @description When setting a number, it will be used as backToTop button threshold distance (in pixels)
     *
     * 是否启用返回顶部按钮
     *
     * @description 当设置为数字时，将会作为返回顶部按钮距离阈值 (单位: 像素)
     */
    backToTop?: number | boolean;

    /**
     * Global notice config
     *
     * 全局通知配置
     */
    notice?: NoticeOptions;
  };

  locales?: {
    /**
     * backToTop button Locales config
     *
     * 返回顶部按钮国际化配置
     */
    backToTop?: LocaleConfig<BackToTopLocaleData>;
  };
}
