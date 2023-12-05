import type { RequiredLocaleConfig } from "vuepress-shared";

export interface CopyCodeLocaleData {
  /**
   * Copy text
   *
   * 复制文字
   */
  copy: string;

  /**
   * Copied text
   *
   * 已复制文字
   */
  copied: string;

  /**
   * Success message text after content is copied
   *
   * 复制成功提示消息文字
   */
  hint: string;
}

export type CopyCodeLocaleConfig = RequiredLocaleConfig<CopyCodeLocaleData>;
