---
title: 提示容器
icon: box-open
category:
  - Markdown
tag:
  - Markdown
  - 提示容器
---

主题可以为你添加提示、注释、信息、注意、警告和详情提示容器的支持。

<!-- more -->

## 配置

```js {8} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      markdownHint: {
        // 这就是默认选项，所以你可以直接使用此功能
        hint: true,
      },
    },
  }),
};
```

## 演示

:::: md-demo 默认标题的容器

::: important
重要容器。
:::

::: info
信息容器。
:::

::: note
注释容器。
:::

::: tip
提示容器
:::

::: warning
警告容器
:::

::: caution
危险容器
:::

::: details
详情容器
:::

::::

:::: md-demo 自定义标题的容器

::: important 自定义标题

一个有 `代码` 和 [链接](#演示) 的重要容器。

```js
const a = 1;
```

:::

::: info 自定义标题

一个有 `代码` 和 [链接](#演示) 的信息容器。

```js
const a = 1;
```

:::

::: note 自定义标题

一个有 `代码` 和 [链接](#演示) 的注释容器。

```js
const a = 1;
```

:::

::: tip 自定义标题

一个有 `代码` 和 [链接](#演示) 的提示容器。

```js
const a = 1;
```

:::

::: warning 自定义标题

一个有 `代码` 和 [链接](#演示) 的警告容器。

```js
const a = 1;
```

:::

::: caution 自定义标题

一个有 `代码` 和 [链接](#演示) 的危险容器。

```js
const a = 1;
```

:::

::: details 自定义标题

一个有 `代码` 和 [链接](#演示) 的详情容器。

```js
const a = 1;
```

:::

::::

:::: md-demo 不含内容的容器

::: important 自定义重要
:::

::: info 自定义信息
:::

::: note 自定义注释
:::

::: tip 自定义提示
:::

::: warning 自定义警告
:::

::: caution 自定义危险
:::

::::
