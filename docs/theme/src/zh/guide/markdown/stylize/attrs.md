---
title: 属性支持
icon: code
category:
  - Markdown
tag:
  - Markdown
  - 属性
---

你可以使用特殊标记为 Markdown 元素添加属性。

<!-- more -->

## 配置

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    attrs: true,
  },
});
```

## 使用

你可以使用语法 `{attrs}` 来为 Markdown 元素添加属性。

比如，如果你想要一个 id 为 say-hello-world，文字为 Hello World 的二级标题，你可以使用:

```md
## Hello World {#say-hello-world}
```

如果你想要一个有 full-width Class 的图片，你可以使用:

```md
![img](link/to/image.png) {.full-width}
```

同时也支持其他属性:

```md
一个包含文字的段落。 {#p .a .b align=center customize-attr="content with spaces"}
```

会被渲染为:

```html
<p id="p" class="a b" align="center" customize-attr="content with spaces">
  一个包含文字的段落。
</p>
```

## 高级

你可以向 `attrs` 传递选项以自定义插件行为。

```ts
type MarkdownItAttrRuleName =
  | "fence"
  | "inline"
  | "table"
  | "list"
  | "hr"
  | "softbreak"
  | "block";

interface MarkdownItAttrsOptions {
  /**
   * 左分隔符
   *
   * @default '{'
   */
  left?: string;

  /**
   * 右分隔符
   *
   * @default '}'
   */
  right?: string;

  /**
   * 允许的属性
   *
   * @description 设置空数组意味着允许所有属性
   *
   * @default []
   */
  allowed?: (string | RegExp)[];

  /**
   * 启用的规则
   *
   * @default "all"
   */
  rule?: "all" | boolean | MarkdownItAttrRuleName[];
}
```

## 示例

> 所有的 class 都使用 `margin:4px;padding:4px;border: 1px solid red;` 进行显示以展示效果。

::: md-demo 行内元素

包含 `行内代码`{.inline-code} 和 ![favicon](/favicon.ico){.image} 的文字，也支持 _强调_{.inline-emphasis} 和 **加粗**{.inline-bold}。

:::

::: md-demo 块级元素

块级元素 {.block}

:::

::: md-demo 代码块

```js {.fence}
const a = 1;
```

:::

::: md-demo 表格

| 表格 |
| ---- |
| 内容 |

{.md-table}

:::

::: md-demo 列表

- 列表内容{.list-item}

  - 嵌套列表内容
    {.nested}

{.list-wrapper}

:::

::: md-demo 水平线

--- {.horizontal}

:::

::: md-demo 换行

一行换行的文字  
{.break}

:::

<style scope>
.block,
.break,
.horizontal,
.image,
.inline-code,
.list-wrapper,
.list-item,
.nested,
.inline-emphasis,
.inline-bold,
.md-table,
.fence {
  margin: 4px;
  padding: 4px;
  border: 1px solid red;
}
</style>
