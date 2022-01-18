import type { LocaleConfig } from "@vuepress/core";
import type { ComponentLocaleData } from "./locales";

export interface ComponentOptions {
  /**
   * Locale config
   */
  locales?: LocaleConfig<ComponentLocaleData>;
}
