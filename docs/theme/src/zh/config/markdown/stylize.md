---
title: Markdown 样式化配置
icon: b:markdown
order: 3
category:
  - 配置
tag:
  - Markdown 配置
  - 主题配置
---

以下选项在 Markdown 中添加了新的样式化功能，可以在主题选项的 `markdown` 属性下进行设置。

## markdown.align

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [Markdown → 对齐](../../guide/markdown/stylize/align.md)
  - [@vuepress/plugin-markdown-stylize → align][align]

是否启用自定义对齐。

## markdown.attrs

- 类型: `MarkdownItAttrsOptions | boolean`

  ```ts
  type MarkdownItAttrRuleName =
    | "fence"
    | "inline"
    | "table"
    | "list"
    | "hr"
    | "softbreak"
    | "block";

  interface MarkdownItAttrsOptions {
    /**
     * 左分隔符
     *
     * @default '{'
     */
    left?: string;

    /**
     * 右分隔符
     *
     * @default '}'
     */
    right?: string;

    /**
     * 允许的属性
     *
     * @description 空列表表示允许所有属性
     *
     * @default []
     */
    allowed?: (string | RegExp)[];
    /**
     * 启用的规则
     *
     * @default "all"
     */
    rule?: "all" | boolean | MarkdownItAttrRuleName[];
  }
  ```

- 默认值: `false`
- 详情:
  - [Markdown → 属性](../../guide/markdown/stylize/attrs.md)
  - [@vuepress/plugin-markdown-stylize → attrs][attrs]

是否启用属性自定义支持。

## markdown.mark

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [Markdown → 标记](../../guide/markdown/stylize/mark.md)
  - [@vuepress/plugin-markdown-stylize → mark][mark]

是否启用标记支持。

## markdown.sup

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [Markdown → 上标](../../guide/markdown/stylize/sup-sub.md)
  - [@vuepress/plugin-markdown-stylize → sup][sup]

是否启用上标支持。

## markdown.sub

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [Markdown → 下标](../../guide/markdown/stylize/sup-sub.md)
  - [@vuepress/plugin-markdown-stylize → sub][sub]

是否启用下标支持。

## markdown.spoiler

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [Markdown → 隐藏内容](../../guide/markdown/stylize/spoiler.md)
  - [@vuepress/plugin-markdown-stylize → spoiler][spoiler]

是否启用隐藏内容支持。

## markdown.stylize

- 类型: `MarkdownItStylizeConfig[] | false`

  ```ts
  interface MarkdownItStylizeResult {
    /**
     * 渲染的标签名称
     */
    tag: string;
    /**
     * 属性设置
     */
    attrs: Record<string, string>;
    /**
     * 标签内容
     */
    content: string;
  }

  interface MarkdownItStylizeConfig {
    /**
     * 字符匹配
     */
    matcher: string | RegExp;
    /**
     * 内容替换
     */
    replacer: (options: {
      tag: string;
      content: string;
      attrs: Record<string, string>;
      env?: any;
    }) => MarkdownItStylizeResult | null | undefined | void;
  }
  ```

- 默认值: `false`
- 详情:
  - [Markdown → 样式化](../../guide/markdown/stylize/stylize.md)
  - [@vuepress/plugin-markdown-stylize → custom][stylize]

样式化内联标记以创建所需的片段。

[align]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-stylize.html#align
[attrs]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-stylize.html#attrs
[mark]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-stylize.html#mark
[sup]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-stylize.html#sup
[sub]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-stylize.html#sub
[spoiler]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-stylize.html#spoiler
[stylize]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-stylize.html#custom
