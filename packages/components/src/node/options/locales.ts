import type { LocaleConfig } from "vuepress/shared";

import type { SiteInfoLocaleData } from "../../shared/index.js";

export interface ComponentLocaleOptions {
  /**
   * SiteInfo Locales config
   *
   * 站点信息 组件国际化配置
   */
  siteInfo?: LocaleConfig<SiteInfoLocaleData>;
}
