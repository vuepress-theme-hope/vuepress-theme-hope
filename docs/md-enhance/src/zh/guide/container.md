---
title: 自定义容器
icon: customize
---

插件可以为你添加提示、注释、信息、注意、警告和详情自定义容器的支持。

<!-- more -->

## 配置

```js {7}
module.exports = {
  plugins: [
    [
      "md-enhance",
      {
        // 启用自定义容器
        container: true,
      },
    ],
  ],
};
```

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
信息容器
:::

::: note 自定义标题
注释容器
:::

::: tip 自定义标题
提示容器
:::

::: warning 自定义标题
警告容器
:::

::: danger 自定义标题
危险容器
:::

::: details 自定义标题
详情容器
:::

```md
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
信息容器
:::

::: note 自定义标题
注释容器
:::

::: tip 自定义标题
提示容器
:::

::: warning 自定义标题
警告容器
:::

::: danger 自定义标题
危险容器
:::

::: details 自定义标题
详情容器
:::
```
