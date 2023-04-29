import { type LocaleConfig } from "@vuepress/core";

import { type MinisearchLocaleData } from "../shared/locales.js";

export interface MinisearchOptions {
  /**
   * @default true
   */
  detailedView?: boolean;

  /**
   * @default true
   */
  queryHistory?: boolean;

  /**
   * Locales config
   *
   * 国际化配置
   */
  locales?: LocaleConfig<MinisearchLocaleData>;
}
