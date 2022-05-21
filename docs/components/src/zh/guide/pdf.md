---
title: PDF
---

PDF 预览组件。

你可以使用此组件在 Markdown 中嵌入 PDF 阅读器。

<!-- more -->

## 属性

### url

- 类型: `string`
- 必填: 是

PDF 链接，**不支持**相对路径。

### height

- 类型: `string | number`
- 必填: 是

PDF 预览器的高度

### page

- 类型: `number`
- 默认值: `1`

PDF 文档的初始页面

::: warning

此属性仅在基于 Chromium 内核的浏览器上有效。

:::

#### toolbar

- 类型: `boolean`
- 默认值: `true`

是否显示工具栏

::: warning

此属性仅在基于 Chromium 内核的浏览器上有效。

:::

#### zoom

- 类型: `number`
- 默认值: `100`

PDF 文档的初始缩放比例

::: warning

此属性仅在基于 Chromium 内核的浏览器上有效。

:::

## Demo

默认 PDF 阅读器:

<PDF url="/sample.pdf" />

```md
<PDF url="/sample.pdf" />
```

禁用工具栏:

<PDF url="/sample.pdf" :toolbar="false" />

```md
<PDF url="/sample.pdf" :toolbar="false" />
```

初始页面为第二页:

<PDF url="/sample.pdf" :page="2" />

```md
<PDF url="/sample.pdf" :page="2" />
```
