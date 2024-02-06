import type { LocaleConfig } from "vuepress/shared";

import type {
  BackToTopLocaleData,
  PDFLocaleData,
  SiteInfoLocaleData,
} from "../../shared/index.js";

export interface ComponentLocaleOptions {
  /**
   * @deprecated Please use '@vuepress/plugin-back-to-top'
   *
   * BackToTop button Locales config
   *
   * 返回顶部按钮国际化配置
   */
  backToTop?: LocaleConfig<BackToTopLocaleData>;

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
}
