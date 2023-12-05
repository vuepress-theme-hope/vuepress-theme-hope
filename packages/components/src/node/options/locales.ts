import type { LocaleConfig } from "@vuepress/core";

import type {
  BackToTopLocaleData,
  CatalogLocaleData,
  PDFLocaleData,
  SiteInfoLocaleData,
} from "../../shared/index.js";

export interface ComponentLocaleOptions {
  /**
   * backToTop button Locales config
   *
   * 返回顶部按钮国际化配置
   */
  backToTop?: LocaleConfig<BackToTopLocaleData>;

  /**
   * @deprecated
   *
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
}
