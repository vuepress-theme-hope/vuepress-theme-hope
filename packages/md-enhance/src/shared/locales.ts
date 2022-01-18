import type { CovertLocaleConfig } from "@mr-hope/vuepress-shared";

export interface MarkdownEnhanceLocaleData {
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

export type MarkdownContainerName = keyof MarkdownEnhanceLocaleData;

export type MarkdownEnhanceLocaleConfig =
  CovertLocaleConfig<MarkdownEnhanceLocaleData>;
