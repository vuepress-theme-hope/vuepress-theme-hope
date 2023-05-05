---
title: 自定义对齐
icon: align-center
category:
  - Markdown
tag:
  - Markdown
  - 对齐
---

通过对 `vuepress-plugin-container` 进行额外的配置注入，你可以使用

```md
::: center
要居中的段落
:::

::: right
要居右的段落
:::
```

来对你的段落对齐进行自定义。

<!-- more -->

## 配置

::: code-tabs#language

@tab TS

```ts {8-10}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        align: true,
      },
    },
  }),
});
```

@tab JS

```js {7-9}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        align: true,
      },
    },
  }),
};
```

:::

## 语法

```md
::: left
左对齐的内容
:::

::: center
居中的内容
:::

::: right
右对齐的内容
:::

::: justify
两端对齐的内容
:::
```

::::: details 嵌套和转义

- 嵌套可以通过增加外层容器的 marker 数量完成:

  ```md
  :::: center
  居中的内容...
  ::: left
  左对齐的内容...
  :::
  居中的内容...
  ::::
  ```

  会被渲染为

  :::: center
  居中的内容...
  ::: left
  左对齐的内容...
  :::
  居中的内容...
  ::::

- 转义可以通过在 marker 前添加 `\` 转义来完成:

  ```md
  \::: left

  :::
  ```

  会被渲染为

  \::: left

  :::

:::::

## 演示

:::: danger W.I.P
vuepress-theme-hope v2 仍在制作中，API 可能会有

::: center
重大的变动。
:::

如果你在使用过程中遇到了 bug，可以

::: right
[提一个 issue](https://github.com/vuepress-theme-hope/vuepress-theme-hope/issues)。
:::

::::

```md
:::: danger W.I.P
vuepress-theme-hope v2 仍在制作中，API 可能会有

::: center
重大的变动。
:::

如果你在使用过程中遇到了 bug，可以

::: right
[提一个 issue](https://github.com/vuepress-theme-hope/vuepress-theme-hope/issues)。
:::

::::
```
