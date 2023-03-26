import { type App, type LocaleConfig } from "@vuepress/core";

import {
  type LocaleRedirectConfig,
  type RedirectLocaleData,
} from "../shared/index.js";

export interface RedirectOptions
  extends Partial<Omit<LocaleRedirectConfig, "localeConfig">> {
  /**
   * Redirect mapping
   *
   * @description if the link starts with `/` then, hostname and base will be added in front of it.
   *
   * 重定向映射
   *
   * @description 如果链接以 `/` 开头，则会在前面添加 hostname 和 base
   */
  config?: Record<string, string> | ((app: App) => Record<string, string>);

  /**
   * domain which to be redirected to
   *
   * 重定向到的网站域名
   */
  hostname?: string;

  /**
   * Locale language config
   *
   * 多语言语言配置
   */
  localeConfig?: Record<string, string | string[]>;

  /**
   * Locales config
   *
   * @see [default config](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/redirect/src/node/locales.ts)
   *
   * 多语言选项
   *
   * @see [默认配置](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/redirect/src/node/locales.ts)
   */
  locales?: LocaleConfig<RedirectLocaleData>;
}
