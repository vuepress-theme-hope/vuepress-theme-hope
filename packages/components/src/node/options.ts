import type { LocaleConfig } from "@vuepress/core";
import type {
  ArtPlayerOptions,
  BackToTopLocaleData,
  CatalogLocaleData,
  NoticeOptions,
  PDFLocaleData,
  SiteInfoLocaleData,
} from "../shared/index.js";

export type AvailableComponent =
  | "ArtPlayer"
  | "AudioPlayer"
  | "Badge"
  | "BiliBili"
  | "Catalog"
  | "CodePen"
  | "FontIcon"
  | "PDF"
  | "StackBlitz"
  | "SiteInfo"
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
     * ArtPlayer config
     *
     * ArtPlayer 配置
     */
    artPlayer?: ArtPlayerOptions;

    /**
     * FontIcon config
     *
     * 图标配置
     */
    fontIcon?: {
      /**
       * Link of font icon asset
       *
       * 字体图标资源链接
       *
       * @description `"iconfont"` and `"fontawesome"` keywords are supported
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
       * @default ""
       */
      prefix?: string;
    };

    /**
     * PDF viewer config
     *
     * PDF 阅读器配置
     */
    pdf?: {
      /**
       * Location of pdfjs
       *
       * pdfjs 的位置
       */
      pdfjs?: string;
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
    notice?: NoticeOptions[];
  };

  locales?: {
    /**
     * backToTop button Locales config
     *
     * 返回顶部按钮国际化配置
     */
    backToTop?: LocaleConfig<BackToTopLocaleData>;

    /**
     * Catalog Locales config
     *
     * 目录组件国际化配置
     */
    catalog?: LocaleConfig<CatalogLocaleData>;

    /**
     * PDF Locales config
     *
     * PDF 组件国际化配置
     */
    pdf?: LocaleConfig<PDFLocaleData>;

    /**
     * SiteInfo Locales config
     *
     * 站点信息 组件国际化配置
     */
    siteInfo?: LocaleConfig<SiteInfoLocaleData>;
  };
}
