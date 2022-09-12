import type { LocaleConfig } from "@vuepress/core";
import type { WalineInitOptions, WalineLocale } from "@waline/client";
import type { ConvertLocaleConfig } from "vuepress-shared";
import type { BaseCommentOptions } from "./base.js";

export type WalineLocaleData = Partial<WalineLocale>;

export type WalineLocaleConfig = ConvertLocaleConfig<WalineLocaleData>;

export interface WalineOptions
  extends BaseCommentOptions,
    Omit<WalineInitOptions, "el" | "comment"> {
  provider: "Waline";

  /**
   * Whether import meta icons
   *
   * 是否导入 Meta 图标
   *
   * @default true
   */
  metaIcon?: boolean;

  /**
   * Whether enable page views count by default
   *
   * 是否启用访问量
   *
   * @default true
   */
  pageview?: boolean;

  /**
   * Locale config for waline
   */
  walineLocales?: LocaleConfig<WalineLocaleData>;
}
