import type { ResolvedLocaleConfig } from "@mr-hope/vuepress-shared";

export interface MarkdownEnhanceI18nConfig {
  /**
   * 信息块的默认标题
   *
   * Default Title text for info block
   */
  info: string;

  /**
   * 提示块的默认标题
   *
   * Default Title text for tip block
   */
  tip: string;

  /**
   * 注意块的默认标题
   *
   * Default Title text for warning block
   */
  warning: string;

  /**
   * 警告块的默认标题
   *
   * Default Title text for danger block
   */
  danger: string;

  /**
   * 详情块的默认标题
   *
   * Default Title text for details block
   */
  details: string;
}

export type MarkdownContainerName = keyof MarkdownEnhanceI18nConfig;

export type MarkdownEnhanceLocaleConfig =
  ResolvedLocaleConfig<MarkdownEnhanceI18nConfig>;
