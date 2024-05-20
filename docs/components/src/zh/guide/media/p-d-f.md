---
title: PDF
---

PDF 预览组件。

你可以使用此组件在 Markdown 中嵌入 PDF 阅读器。

<!-- more -->

## 示例

<!-- #region demo -->

::: md-demo 默认 PDF 阅读器

<PDF url="//theme-hope-assets.vuejs.press/files/sample.pdf" />

:::

::: md-demo 禁用工具栏且初始页面为第二页的阅读器

<PDF url="//theme-hope-assets.vuejs.press/files/sample.pdf" page="2" no-toolbar />

:::

<!-- #endregion demo -->

## PDFJS 查看器

并非所有浏览器都支持嵌入 PDF 查看器 (如: 现在没有移动浏览器支持此功能)，因此我们添加了对 PDFJS 查看器的支持。

默认情况下，PDFJS 查看器是从 `https://theme-hope-assets.vuejs.press/pdfjs/` 获取的。你可以在组件选项中自定义 `componentOptions.pdf.pdfjs` 以指定其他位置。

::: important PDFJS 查看器

我们的 PDFJS 查看器仅供非商业用途的社区使用，要使用 PDFJS 查看器，你的 PDF 文件应包含允许 `theme-hope-assets.vuejs.press` 的 CORS 标头。

如果你不能满足上述条件，则需自行托管 PDFJS 查看器。为此，你应该从 <https://github.com/mozilla/pdf.js/releases> 下载最新的 PDFJS 查看器，然后将其复制到 `.vuepress/public` 文件夹。 之后，在组件选项中将`componentOptions.pdf.pdfjs` 设置为 `<BASE><public 文件夹内的相对路径>`。

:::

::: details noToolbar 支持

默认的 PDFJS 查看器不支持自定义工具栏，如果你想添加这个功能的支持，你应该手动将以下代码添加到在 `pdfjs` 文件夹中的 `web/viewer.html` 的 `<script src="viewer.js"></script>` 行之前：

```html
<!-- ... -->
<link rel="stylesheet" href="viewer.css" />

<!-- ========== 下面是你应该添加的内容 ============= -->

<!-- 添加对 toolbar=0 的支持 -->
<script>
  if (location.hash.includes("toolbar=0")) {
    const style = document.createElement("style");

    style.textContent = "#toolbarContainer { display: none; }";
    document.head.append(style);
  }
</script>

<!-- ========== 以上是你应该添加的 ============= -->

<script src="viewer.mjs"></script>
<!-- ... -->
```

::::

## 属性

### url

- 类型: `string`
- 必填: 是

PDF 链接

当填写路径名时，`base` 将自动添加到路径名的开头。

::: warning 限制

- 始终推荐完整的 URL
- 不支持相对路径。
- 路径名无法在开发服务器中和嵌入 PDFJS 查看器一起使用，并且生产环境的 URL 必须拥有合适的 CORS 策略。

:::

### width

- 类型: `string | number`
- 默认值: `100%`

PDF 浏览器宽度。

### height

- 类型: `string | number`
- 必填：否

PDF 浏览器件高度

### ratio

- 类型: `number`
- 默认值: `16 / 9`

PDF 浏览器高度宽高比，只有当未指定 `height` 时有效。

### viewer

- 类型: `boolean`
- 默认值: `false`

是否强制使用 PDFJS 查看器。

### page

- 类型: `number`
- 默认值: `1`

PDF 文档的初始页面

::: warning

此属性仅在基于 Chromium 内核的浏览器上有效。

:::

### noFullscreen

- 类型: `boolean`
- 默认值: `false`

是否禁用全屏按钮

### noToolbar

- 类型: `boolean`
- 默认值: `false`

是否隐藏工具栏

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
