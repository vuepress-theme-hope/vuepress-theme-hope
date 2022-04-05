import type { LocaleConfig, Page } from "@vuepress/core";
import type { CopyrightLocaleData } from "./locales";

export interface CopyrightOptions {
  /**
   * Deploy hostname
   *
   * 部署的域名
   */
  hostname?: string;

  /**
   * Author Infomation
   *
   * 作者信息
   */
  author?: string | ((page: Page) => string);

  /**
   * License Infomation
   *
   * 协议信息
   */
  license?: string | ((page: Page) => string);

  /**
   * Min words triggering copyright append
   *
   * 触发附加版权的最小字数
   *
   * @default 100
   */
  triggerWords?: number;

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
}
