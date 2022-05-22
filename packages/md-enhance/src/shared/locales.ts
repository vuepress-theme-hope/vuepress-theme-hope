import type { ConvertLocaleConfig } from "vuepress-shared";

export interface MarkdownEnhanceLocaleData {
  /**
   * Default Title text for info block
   *
   * 信息块的默认标题
   */
  info: string;

  /**
   * Default Title text for note block
   *
   * 注释块的默认标题
   */
  note: string;

  /**
   * Default Title text for tip block
   *
   * 提示块的默认标题
   */
  tip: string;

  /**
   * Default Title text for warning block
   *
   * 注意块的默认标题
   */
  warning: string;

  /**
   * Default Title text for danger block
   *
   * 警告块的默认标题
   */
  danger: string;

  /**
   * Default Title text for details block
   *
   * 详情块的默认标题
   */
  details: string;
}

export type MarkdownContainerName = keyof MarkdownEnhanceLocaleData;

export type MarkdownEnhanceLocaleConfig =
  ConvertLocaleConfig<MarkdownEnhanceLocaleData>;
