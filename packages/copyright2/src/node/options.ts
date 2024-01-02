import type { LocaleConfig, Page } from "@vuepress/core";

import type { CopyrightLocaleData } from "../shared/locales.js";

export interface CopyrightOptions {
  /**
   * Default Author Information
   *
   * 默认作者信息
   */
  author?: string;

  /**
   * Author Getter
   *
   * 作者获取器
   */
  authorGetter?: <
    ExtraPageData extends Record<string, unknown> = Record<never, never>,
    ExtraPageFrontmatter extends Record<string, unknown> = Record<
      string,
      unknown
    >,
    ExtraPageFields extends Record<string, unknown> = Record<never, never>,
  >(
    page: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>,
  ) => string | null;

  /**
   * Default License Information
   *
   * 默认协议信息
   */
  license?: string;

  /**
   * License getter
   *
   * 协议信息获取器
   */
  licenseGetter?: <
    ExtraPageData extends Record<string, unknown> = Record<never, never>,
    ExtraPageFrontmatter extends Record<string, unknown> = Record<
      string,
      unknown
    >,
    ExtraPageFields extends Record<string, unknown> = Record<never, never>,
  >(
    page: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>,
  ) => string | null;

  /**
   * Copyright Getter
   *
   * 协议获取器
   */
  copyrightGetter?: <
    ExtraPageData extends Record<string, unknown> = Record<never, never>,
    ExtraPageFrontmatter extends Record<string, unknown> = Record<
      string,
      unknown
    >,
    ExtraPageFields extends Record<string, unknown> = Record<never, never>,
  >(
    page: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>,
  ) => string | null;

  /**
   * @deprecated Use `triggerLength` instead
   */
  triggerWords?: number;

  /**
   * Min length triggering copyright append
   *
   * 触发附加版权的最小长度
   *
   * @default 100
   */
  triggerLength?: number;

  /**
   * Max length that allows to copy
   *
   * @description 0 means unlimited
   *
   * 允许复制的最大字数
   *
   * @description 0 表示无限制
   *
   * @default 0
   */
  maxLength?: number;

  /**
   * Whether enabled globally
   *
   * 是否全局启用
   *
   * @default false
   */
  global?: boolean;

  /**
   * Disable copy
   *
   * 禁用复制
   *
   * @default false
   */
  disableCopy?: boolean;

  /**
   * Disable selection
   *
   * 禁用选择
   *
   * @default false
   */
  disableSelection?: boolean;

  /**
   * Locales config for copyright
   *
   * 复制版权的多语言配置
   */
  locales?: LocaleConfig<CopyrightLocaleData>;

  /**
   * Canonical hostname with base
   *
   * @description This is useful when your content are deployed in multiple places
   *
   * 首选域名与部署目录
   *
   * @description 当你在多个站点部署内容时很有用。
   */
  canonical?: string;
}
