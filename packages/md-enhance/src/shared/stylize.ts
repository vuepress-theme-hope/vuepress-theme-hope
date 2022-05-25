/**
 * Display enhancements for tokens in the form of `<tag>text</tag>`:
 * (1) add attributes to `tag` (such as class).
 * (2) replace `text` (such as Emoji suffix).
 * Its main purpose is to make some KEYWORD more vivid after render.
 *
 * set `noStylize:[k1,k2]` in MD's frontmatter can
 * disable `k1` and `k2` enhancements in this MD.
 *
 * Note: all configuration items are case-sensitive.
 *
 * 对 `<tag>text</tag>` 形式的 token 组合（inline），进行显示增强：
 * ①对 tag 增加属性（如 class 样式）②对 text 进行替换（如 Emoji 后缀）。
 * 其主要目的是使特定词汇具在 render 后，变得更醒目或生动。
 * 可以通过 front matter 设置 `noStylize:[k1,k2]` 禁用 k1 和 k2 的增强。
 * 注意，所有配置项都区分大小写。
 *
 * @author trydofor
 * @since 2022-05-25
 * @see {@link http://github.com/trydofor | trydofor}
 */
import type { MarkdownEnv } from "@vuepress/markdown";

export type StylizeOption = Record<
  /**
   * `keyword` to be enhanced. `token.content`, do not support REGEXP at this time.
   * global enhancement by default, use `frontmatter.noStylize` to disable temporarily.
   *
   * 增强的关键词，`token.content` 暂不提供正则功能。
   * 默认全局增强，看通过 frontmatter 的noStylize单篇禁用关键词。
   */
  string,
  {
    /**
     * `tags` that `keyword` is in. `token.tag`, eg: ['strong','sup']
     *
     * 所在标签，token.tag，如['strong','sup']。
     */
    tag: string[];

    /**
     * `attrs` enhanced to the tag. Array of `[attr, value]` (2-dimension), eg: `[['class':'badge tip']]`
     * Note: `class` and `style` are `join` by `0x20`, others attr will replace the old by the new.
     *
     * 标签属性，[attr, value]的数组（二维），如 `[['class':'badge tip']]`。
     * class 和 style 属性会 join ，其他属性则覆盖。
     */
    attr?: [string, string][];

    /**
     * replace `token.content` if text/text() is `truthy`
     *
     * `truthy`时，替换原 token.content
     */
    text?: string | ((str: string, env: MarkdownEnv) => string);
  }
>;
