import type { ResolvedLocaleConfig } from "@mr-hope/vuepress-shared";

export interface ComponentI18nConfig {
  /** 返回顶部文字 */
  backToTop: string;
  /** 在新窗口中打开 */
  openInNewWindow: string;
  /** 分页多语言配置 */
  pagination: {
    /** 上一页文字 */
    prev: string;
    /** 下一页文字 */
    next: string;
    /** 跳转文字 */
    navigate: string;
    /** 按钮文字 */
    button: string;
    /** 错误文字 */
    errorText: string;
  };
}

export type ComponentLocaleConfig = ResolvedLocaleConfig<ComponentI18nConfig>;
