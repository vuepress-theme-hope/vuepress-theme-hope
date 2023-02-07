import { type LocaleConfig } from "@vuepress/core";
import { type WalineInitOptions, WalineLocale } from "@waline/client";
import { type RequiredLocaleConfig } from "vuepress-shared";

import { type BaseCommentOptions } from "./base.js";

export type WalineLocaleData = Partial<WalineLocale>;

export type WalineLocaleConfig = RequiredLocaleConfig<WalineLocaleData>;

export interface WalineOptions
  extends BaseCommentOptions,
    Omit<
      WalineInitOptions,
      "el" | "comment" | "locale" | "search" | "imageUploader" | "texRenderer"
    > {
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
   * Whether enable gif search
   *
   * 是否启用表情包搜索
   *
   * @default true
   */
  search?: boolean;

  /**
   * Locale config for waline
   */
  locales?: LocaleConfig<WalineLocaleData>;
}
