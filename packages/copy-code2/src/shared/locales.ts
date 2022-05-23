import type { ConvertLocaleConfig } from "vuepress-shared";

export interface CopyCodeLocaleData {
  /**
   * Copy button label text
   *
   * 复制按钮文字
   */
  copy: string;

  /**
   * Success message text after content is copied
   *
   * 复制成功提示消息文字
   */
  hint: string;
}

export type CopyCodeLocaleConfig = ConvertLocaleConfig<CopyCodeLocaleData>;
