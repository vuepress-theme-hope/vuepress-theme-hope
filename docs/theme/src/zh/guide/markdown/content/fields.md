---
title: 字段
icon: clipboard-list
category:
  - Markdown
tag:
  - Markdown
  - 字段
---

在你的 VuePress 站点中描述对象的字段。

<!-- more -->

## 配置

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    fields: true,
  },
});
```

## 语法

使用 `fields` 容器描述字段。以 `@名称@` 开头的每一行是一个字段项，其属性紧跟在结尾的 `@` 之后。

```md
::: fields
@theme@ type="ThemeConfig" required default="{ base: '/' }"

主题配置。

@enabled@ type="boolean" optional default="true"

是否启用。

:::
```

所有属性都会被允许并原样展示。常见属性如下：

- `type` 会在字段头部以代码块展示。
- `default` 会在字段头部下方以带标签的代码块展示。
- `required`、`optional` 与 `deprecated` 会以徽章展示，被弃用的字段名会显示为红色并带有删除线。
- 其他属性会以 `名称: 值` 的徽章展示。

### 嵌套

若要描述对象类型的字段，可以在另一个字段项内部嵌套字段，每增加一层嵌套，开头与结尾的 `@` 就增加一个。

```md
::: fields
@options@ type="object"

选项。

@@options.name@ type="string"

选项名称。

:::
```

## 演示

:::: preview

::: fields
@theme@ type="ThemeConfig" required default="{ base: '/' }"

主题配置。

@enabled@ type="boolean" optional default="true"

是否启用。

@legacy@ type="string" deprecated

已弃用字段。

:::

::::
