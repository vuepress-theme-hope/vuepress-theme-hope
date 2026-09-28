---
title: Markdown 样式化配置
icon: fa7-brands:markdown
order: 3
category:
  - 配置
tag:
  - Markdown 配置
  - 主题配置
---

以下选项在 Markdown 中添加了新的样式化功能，可以在主题选项的 `markdown` 属性下进行设置。

## 选项 {#options}

::: fields
@`markdown.hint` type=boolean default=`true`

是否启用提示容器，包括 important、info、note、tip、warning、caution 与 details。

参考：[Markdown → 提示容器](../../guide/markdown/stylize/hint.md) 与 [@vuepress/plugin-markdown-hint → hint][hint]。

@`markdown.alert` type=boolean

是否启用 GFM 警告。

参考：[Markdown → GFM 警告](../../guide/markdown/stylize/alert.md) 与 [@vuepress/plugin-markdown-hint → alert][alert]。

@`markdown.align` type=boolean

是否启用自定义对齐。

参考：[Markdown → 对齐](../../guide/markdown/stylize/align.md) 与 [@vuepress/plugin-markdown-stylize → align][align]。

@`markdown.attrs` type=`MarkdownItAttrsOptions | boolean`

是否启用属性自定义支持。

参考：[Markdown → 属性](../../guide/markdown/stylize/attrs.md) 与 [@vuepress/plugin-markdown-stylize → attrs][attrs]。

@@`markdown.attrs.left` type=string default=`'{'`

左分隔符。

@@`markdown.attrs.right` type=string default=`'}'`

右分隔符。

@@`markdown.attrs.allowed` type=`(string | RegExp)[]` default=`[]`

允许的属性。空列表表示允许所有属性。

@@`markdown.attrs.rule` type=`"all" | boolean | MarkdownItAttrRuleName[]` default=`"all"`

启用的规则，其中 `MarkdownItAttrRuleName` 是 `"fence"`、`"inline"`、`"table"`、`"list"`、`"hr"`、`"softbreak"` 与 `"block"` 之一。

@`markdown.layout` type=boolean

是否启用布局支持。

参考：[Markdown → 布局](../../guide/markdown/stylize/layout.md) 与 [@vuepress/plugin-markdown-stylize → layout][layout]。

@`markdown.mark` type=boolean

是否启用标记支持。

参考：[Markdown → 标记](../../guide/markdown/stylize/mark.md) 与 [@vuepress/plugin-markdown-stylize → mark][mark]。

@`markdown.sup` type=boolean

是否启用上标支持。

参考：[Markdown → 上标](../../guide/markdown/stylize/sup-sub.md) 与 [@vuepress/plugin-markdown-stylize → sup][sup]。

@`markdown.sub` type=boolean

是否启用下标支持。

参考：[Markdown → 下标](../../guide/markdown/stylize/sup-sub.md) 与 [@vuepress/plugin-markdown-stylize → sub][sub]。

@`markdown.spoiler` type=boolean

是否启用隐藏内容支持。

参考：[Markdown → 隐藏内容](../../guide/markdown/stylize/spoiler.md) 与 [@vuepress/plugin-markdown-stylize → spoiler][spoiler]。

@`markdown.steps` type=boolean

是否启用步骤支持。

参考：[Markdown → 步骤](../../guide/markdown/stylize/steps.md) 与 [@vuepress/plugin-markdown-stylize → steps][steps]。

@`markdown.stylize` type=`MarkdownItStylizeConfig[] | false`

样式化内联标记以创建所需的片段。

参考：[Markdown → 样式化](../../guide/markdown/stylize/stylize.md) 与 [@vuepress/plugin-markdown-stylize → custom][stylize]。

@@`markdown.stylize[*].matcher` type=`string | RegExp`

字符匹配。

@@`markdown.stylize[*].replacer` type=`(options: { tag: string; content: string; attrs: Record<string, string>; env?: any }) => MarkdownItStylizeResult | null | undefined | void`

内容替换。`MarkdownItStylizeResult` 为：

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
```

:::

[align]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-stylize.html#align
[alert]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-hint.html#alert
[hint]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-hint.html#hint
[attrs]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-stylize.html#attrs
[layout]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-stylize.html#layout
[mark]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-stylize.html#mark
[sup]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-stylize.html#sup
[sub]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-stylize.html#sub
[spoiler]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-stylize.html#spoiler
[steps]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-stylize.html#steps
[stylize]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-stylize.html#custom
