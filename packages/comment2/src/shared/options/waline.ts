import type { LocaleConfig } from "@vuepress/core";
import type {
  WalineLocale,
  WalineOptions as _WalineOptions,
} from "@waline/client";
import type { BaseCommentOptions } from "./base";

export type WalineLocaleData = Partial<WalineLocale>;

export type WalineLocaleConfig = LocaleConfig<WalineLocaleData>;

export interface WalineOptions
  extends BaseCommentOptions,
    Omit<_WalineOptions, "el" | "visitor"> {
  type: "waline";

  /**
   * 是否启用访问量
   *
   * Whether enable page views count by default
   *
   * @default true
   */
  pageviews?: boolean;

  /**
   * Locale config for waline
   */
  walineLocales?: LocaleConfig<WalineLocaleData>;
}
