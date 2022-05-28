import type { LocaleConfig } from "@vuepress/core";
import type { WalineInitOptions, WalineLocale } from "@waline/client";
import type { BaseCommentOptions } from "./base";

export type WalineLocaleData = Partial<WalineLocale>;

export type WalineLocaleConfig = LocaleConfig<WalineLocaleData>;

export interface WalineOptions
  extends BaseCommentOptions,
    Omit<WalineInitOptions, "el" | "comment"> {
  type: "waline";

  /**
   * 是否启用访问量
   *
   * Whether enable page views count by default
   *
   * @default true
   */
  pageview?: boolean;

  /**
   * Locale config for waline
   */
  walineLocales?: LocaleConfig<WalineLocaleData>;
}
