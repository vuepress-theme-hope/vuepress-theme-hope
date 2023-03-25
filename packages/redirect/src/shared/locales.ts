import { type RequiredLocaleConfig } from "vuepress-shared";

export interface RedirectLocaleData {
  /**
   * Switch hint
   *
   * 切换提示
   */
  hint: string;

  /**
   * Switch button text
   */
  switch: string;

  /**
   * Cancel button text
   *
   * 取消按钮文字
   */
  cancel: string;
}

export type RedirectLocaleConfig = RequiredLocaleConfig<RedirectLocaleData>;
