---
title: vuepress-plugin-container
icon: plugin
category: config
tags:
  - plugin
  - config
---

Markdown 自定义容器。

<!-- more -->

## 配置项

### type

- 类型: `string`
- 必填: 是

容器的类型。举个例子，如果 `type` 被设置为 `foo`，则仅有下面的语法会被解析为 Markdown 容器:

```md
::: foo bar

随便写点啥 ~

:::
```

### defaultTitle

- 类型: `string | Record<string, string>`
- 默认值: `type` 的大写形式

容器的默认标题。如果没有提供标题，则会使用 `defaultTitle` 作为容器的标题。

提供一个对象作为多语言配置，则默认标题将会基于当前 `locale` 选取。

### before

- 类型: `string | ((info: string) => string)`
- 默认值: `undefined`

要插入在容器前的 HTML。

如果设置为一个函数，将传入当前的 `info` 作为第一个参数。 (在上面的例子中，`info` 的值为 `bar`。)

如果设置了 `before` 的值， `defaultTitle` 将会被忽略。

### after

- 类型: `string | ((info: string) => string)`
- 默认值: `undefined`

要插入在容器后的 HTML。

如果设置为一个函数，将传入当前的 `info` 作为第一个参数。 (在上面的例子中，`info` 的值为 `bar`。)

### validate

- 类型: `((params: string) => boolean)`
- 默认值: `undefined`

一个用于判定容器是否结束的函数。当认定容器范围结束时应返回一个 `true`。

> 参考 [markdown-it-container API](https://github.com/markdown-it/markdown-it-container#api)

### render

- 类型: `Function`
- 默认值: `undefined`

容器开头和结束 token 的渲染函数。如果设置了这个值， `before`, `after` 和 `defaultTitle` 都将被忽略。

> 参考 [markdown-it-container API](https://github.com/markdown-it/markdown-it-container#api)

### marker

- 类型: `string`
- 默认值: `':'`

用于分隔符的字符。

> 参考 [markdown-it-container API](https://github.com/markdown-it/markdown-it-container#api)
