import type { ResolvedLocaleConfig } from "@mr-hope/vuepress-shared";

export interface CopyCodeI18nConfig {
  /**
   * 复制按钮文字
   *
   * Copy button label text
   */
  copy: string;

  /**
   * 复制成功提示消息文字
   *
   * Success message text after content is copied
   */
  hint: string;
}

export type CopyCodeLocaleConfig = ResolvedLocaleConfig<CopyCodeI18nConfig>;
