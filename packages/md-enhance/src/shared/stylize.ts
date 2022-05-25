/**
 * 对<tag>text</tag>形式的token组合(inline)，进行显示增强：
 * ①对tag增加属性（如class样式）②对text进行替换（如Emoji后缀）。
 * 其主要目的是使特定词汇具在render后，变得更醒目或生动。
 * 可以通过front matter设置 noStylize:[t1,t2]禁用t1和t2的增强。
 * 注意，所有配置项都区分大小写。
 * @author trydofor
 * @since 2022-05-25
 * @see {@link http://github.com/trydofor | trydofor}
 */
import { MarkdownEnv } from "@vuepress/markdown";

export type StylizeOption = Record<
  /**
   * 增强的关键词，token.content，暂不提供正则功能。
   * 默认全局增强，看通过front matter的noStylize单篇禁用关键词。
   */
  string,
  {
    /**
     * 所在标签，token.tag，如['strong','sup']。
     */
    tag: string[];

    /**
     * 标签属性，[attr, value]的数组（二维），如[['class':'badge tip']]。
     * class和style属性会join，其他属性则覆盖。
     */
    attr?: [string, string][];

    /**
     * truthy时，替换原token.content
     */
    text?: string | ((str: string, env: MarkdownEnv) => string);
  }
>;
