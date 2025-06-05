---
title: 预览
icon: file-code
order: 2
category:
  - Markdown
tag:
  - 代码选项卡
  - Markdown
---

主题为你提供预览支持。

<!-- more -->

## 配置

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    preview: true,
  },
});
```

## 使用

你可以使用 `preview` 容器来显示一段内容及其源代码。

如果显示的代码与内容的源代码不同，你也可以使用 `<VPPreview>` 组件及其 `code` 和 `content` 插槽。

## 案例

:::: preview

::: preview 可选标题

这里是一些内容。

:::

<VPPreview>

<template #code>

```js
document.innerHTML = "你好，世界！";
```

</template>
<template #content>

你好，世界！

</template>

</VPPreview>

::::
