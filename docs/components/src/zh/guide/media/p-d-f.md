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

由于 PDFJS 查看器 很大，你需要从 [Github](https://github.com/mozilla/pdf.js/releases) 手动下载它。

下载完成后，请在 `.vuepress/public` 文件夹中解压到你想要的位置，然后在组件选项中将 `componentOptions.pdf.pdfjs` 设置为相对于 `.vuepress/public` 的路径。

::: details 示例

如果你将 PDFJS 解压到 `.vuepress/public/assets/lib/pdfjs` ，你应该设置：

```ts
// .vuepress/config.ts
import { componentsPlugin } from "vuepress-plugin-components";

export default {
  plugins: [
    componentsPlugin({
      componentOptions: {
        pdf: {
          pdfjs: "/assets/lib/pdfjs",
        },
      },
    }),
  ],
};
```

::::

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

PDF 链接，**不支持**相对路径。

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

### page

- 类型: `number`
- 默认值: `1`

PDF 文档的初始页面

::: warning

此属性仅在基于 Chromium 内核的浏览器上有效。

:::

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
