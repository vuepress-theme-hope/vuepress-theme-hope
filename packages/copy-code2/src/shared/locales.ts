import type { ResolvedLocaleConfig } from "@mr-hope/vuepress-shared";

export interface CopyCodeI18nConfig {
  /** 复制文字 */
  copy: string;
  /** 提示文字 */
  hint: string;
}

export type CopyCodeLocaleConfig = ResolvedLocaleConfig<CopyCodeI18nConfig>;
