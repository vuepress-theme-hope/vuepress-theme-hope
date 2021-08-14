import type { LocaleConfig } from "@vuepress/core";
import type { ComponentI18nConfig } from "./locales";

export interface ComponentOptions {
  /**
   * I18n config
   */
  locale?: LocaleConfig<ComponentI18nConfig>;
}
