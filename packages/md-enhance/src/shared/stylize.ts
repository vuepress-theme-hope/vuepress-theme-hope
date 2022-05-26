import type { MarkdownEnv } from "@vuepress/markdown";

export interface StylizeResult {
  /**
   * Tag name
   *
   * 渲染的标签名称
   */
  tag: string;

  /**
   * Attributes settings
   *
   * 属性设置
   */
  attrs: Record<string, string>;

  /**
   * Tag content
   *
   * 标签内容
   */
  content: string;
}

export interface StylizeItem {
  /**
   * Inline token matcher
   *
   * 字符匹配
   */
  matcher: string | RegExp;

  /**
   * Content Replacer
   *
   * 内容替换
   */
  replacer: (options: {
    tag: string;
    content: string;
    attrs: Record<string, string>;
    env?: MarkdownEnv;
  }) => StylizeResult | void;
}

export type StylizeOptions = StylizeItem[];
