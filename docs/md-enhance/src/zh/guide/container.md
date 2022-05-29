---
title: 自定义容器
icon: customize
---

插件可以为你添加提示、注释、信息、注意、警告和详情自定义容器的支持。

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
      // 启用自定义容器
      container: true,
    }),
  ],
};
```

@tab JS

```js {8}
// .vuepress/config.js
const { mdEnhancePlugin } = require("vuepress-plugin-md-enhance");

module.exports = {
  plugins: [
    mdEnhancePlugin({
      // 启用自定义容器
      container: true,
    }),
  ],
};
```

:::

## 演示

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

::: danger
危险容器
:::

::: details
详情容器
:::

::: info 自定义标题

一个有 `代码` 和 [链接](#markdown) 的信息容器。

```js
const a = 1;
```

:::

::: note 自定义标题

一个有 `代码` 和 [链接](#markdown) 的注释容器。

```js
const a = 1;
```

:::

::: tip 自定义标题

一个有 `代码` 和 [链接](#markdown) 的提示容器。

```js
const a = 1;
```

:::

::: warning 自定义标题

一个有 `代码` 和 [链接](#markdown) 的警告容器。

```js
const a = 1;
```

:::

::: danger 自定义标题

一个有 `代码` 和 [链接](#markdown) 的危险容器。

```js
const a = 1;
```

:::

::: details 自定义标题

一个有 `代码` 和 [链接](#markdown) 的详情容器。

```js
const a = 1;
```

:::

::: info 自定义信息
:::

::: note 自定义注释
:::

::: tip 自定义提示
:::

::: warning 自定义警告
:::

::: danger 自定义危险
:::

````md
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

::: danger
危险容器
:::

::: details
详情容器
:::

::: info 自定义标题

一个有 `代码` 和 [链接](#markdown) 的信息容器。

```js
const a = 1;
```

:::

::: note 自定义标题

一个有 `代码` 和 [链接](#markdown) 的注释容器。

```js
const a = 1;
```

:::

::: tip 自定义标题

一个有 `代码` 和 [链接](#markdown) 的提示容器。

```js
const a = 1;
```

:::

::: warning 自定义标题

一个有 `代码` 和 [链接](#markdown) 的警告容器。

```js
const a = 1;
```

:::

::: danger 自定义标题

一个有 `代码` 和 [链接](#markdown) 的危险容器。

```js
const a = 1;
```

:::

::: details 自定义标题

一个有 `代码` 和 [链接](#markdown) 的详情容器。

```js
const a = 1;
```

:::

::: info 自定义信息
:::

::: note 自定义注释
:::

::: tip 自定义提示
:::

::: warning 自定义警告
:::

::: danger 自定义危险
:::
````
