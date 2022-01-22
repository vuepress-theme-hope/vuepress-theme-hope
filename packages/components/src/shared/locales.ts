import type { ConvertLocaleConfig } from "@mr-hope/vuepress-shared";

export interface ComponentLocaleData {
  /**
   * Back to top button label text
   *
   * 返回顶部文字
   */
  backToTop: string;

  /**
   * Open in new window text
   *
   * 在新窗口中打开
   */
  openInNewWindow: string;
}

export type ComponentLocaleConfig = ConvertLocaleConfig<ComponentLocaleData>;
