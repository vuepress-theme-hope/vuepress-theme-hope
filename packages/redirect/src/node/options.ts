import type { App } from "@vuepress/core";

export interface RedirectOptions {
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
}
