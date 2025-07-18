---
title: 思维导图
icon: b:markdown
category:
  - Markdown
tag:
  - Markdown
  - 图表
---

让你的 VuePress 站点中的 Markdown 文件支持 markmap。

<!-- more -->

## Settings

在你的项目中安装 `markmap-lib`, `markmap-toolbar` and `markmap-view`:

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D markmap-lib markmap-toolbar markmap-view
```

@tab yarn

```bash
yarn add -D markmap-lib markmap-toolbar markmap-view
```

@tab npm

```bash
npm i -D markmap-lib markmap-toolbar markmap-view
```

:::

然后在配置中启用:

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    markmap: true,
  },
});
```

## 语法

````md
```markmap
<!-- 在这里放置内容 -->
```
````

支持通过 Frontmatter 语法进行配置。

## 案例

::: preview

````markmap
---
markmap:
  colorFreezeLevel: 2
---

# markmap

## 链接

- <https://markmap.js.org/>
- [GitHub](https://github.com/markmap/markmap)

## 功能

- 链接
- **强调** ~~删除线~~ *斜体* ==高亮==
- 多行
  文字
- `行内代码`
-
    ```js
    console.log('code block');
    ```
- Katex
  - $x = {-b \pm \sqrt{b^2-4ac} \over 2a}$
- 现在我们可以通过 `maxWidth` 选项自动换行非常非常非常非常非常非常非常非常非常非常长的内容
````

:::
