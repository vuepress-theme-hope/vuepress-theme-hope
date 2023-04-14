---
title: 自定义对齐
icon: align-center
---

自定义内容对齐方式。

<!-- more -->

## 配置

::: code-tabs#language

@tab TS

```ts {8}
// .vuepress/config.ts
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // 启用自定义对齐
      align: true,
    }),
  ],
};
```

@tab JS

```js {8}
// .vuepress/config.js
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // 启用自定义对齐
      align: true,
    }),
  ],
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
VuePress Theme Hope V2 版本仍在制作中，API 可能会有

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
VuePress Theme Hope V2 版本仍在制作中，API 可能会有

::: center
重大的变动。
:::

如果你在使用过程中遇到了 bug，可以

::: right
[提一个 issue](https://github.com/vuepress-theme-hope/vuepress-theme-hope/issues)。
:::

::::
```
