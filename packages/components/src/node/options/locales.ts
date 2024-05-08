import type { LocaleConfig } from "vuepress/shared";

import type {
  PDFLocaleData,
  SiteInfoLocaleData,
  VidstackLocaleData,
} from "../../shared/index.js";

export interface ComponentLocaleOptions {
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

  /**
   * VidStack Locales config
   *
   * VidStack 组件国际化配置
   */
  vidstack?: LocaleConfig<VidstackLocaleData>;
}
