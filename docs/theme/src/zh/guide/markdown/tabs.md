---
title: 选项卡
icon: table-columns
order: 2
category:
  - Markdown
tag:
  - Markdown
  - 选项卡
---

让你的 Markdown 文件支持供选项卡。

<!-- more -->

## 配置

::: code-tabs#language

@tab TS

```ts {8-11}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // 添加选项卡支持
        tabs: true,
      },
    },
  }),
});
```

@tab JS

```js {7-10}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // 添加选项卡支持
        tabs: true,
      },
    },
  }),
};
```

:::

## 用法

你需要将选项卡包装在 `tabs` 容器中。

你可以在 `tabs` 容器中添加一个 id 后缀，该后缀将用作选项卡 id。 所有具有相同 id 的选项卡将共享相同的切换事件。

```md
::: tabs#fruit

<!-- 这里，fruit 将用作 id，它是可选的 -->

<!-- 选项卡内容 -->

:::
```

在这个容器内，你应该使用 `@tab` 标记来标记和分隔选项卡内容。

在 `@tab` 标记后，你可以添加文本 `:active` 默认激活选项卡，之后的文本将被解析为选项卡标题。

```md
::: tabs

@tab 标题 1

<!-- tab 1 内容 -->

@tab 标题 2

<!-- tab 2 内容 -->

@tab:active 标题 3

<!-- tab 3 将会被默认激活 -->

<!-- tab 3 内容 -->

:::
```

默认情况下，标题将用作选项卡的值，但你可以使用 id 后缀覆盖它。

```md
::: tabs

@tab 标题 1

<!-- 此处，选项卡 1 的标题“标题 1”将用作值。 -->

<!-- tab 1 内容 -->

@tab 标题 2#值 2

<!-- 这里，tab 2 的标题将是 “标题 2”，但它会使用 “值 2” 作为选项卡的值-->

<!-- tab 2 内容 -->

:::
```

你可以在每个选项卡中使用 Vue 语法和组件，并且你可以访问 `value` 和 `isActive`，表示选项卡的绑定值和选项卡是否处于激活状态。

:::: info 一起切换并保持选择

如果你想让一些选项卡组一起切换，你可以使用相同的选项卡 ID 来绑定它们。

针对每个选项卡 ID 的选择会被存储并进行持久化。

下方是一个案例。

选择包管理器:

::: tabs#shell

@tab npm

npm 应该与 Node.js 被一同安装。

@tab pnpm

```bash
corepack prepare pnpm@latest --activated
```

:::

安装 `vuepress-plugin-md-enhance`:

::: tabs#shell

@tab 使用 npm#npm

```bash
npm i -D vuepress-plugin-md-enhance
```

@tab 使用 pnpm#pnpm

```bash
pnpm add -D vuepress-plugin-md-enhance
```

:::

::::

## 案例

一个水果选项卡列表:

::: tabs#fruit

@tab apple#apple

Apple

@tab banana#banana

Banana

:::

```md
::: tabs#fruit

@tab apple#apple

Apple

@tab banana#banana

Banana

:::
```

另一个水果选项卡列表:

::: tabs#fruit

@tab apple

Apple

@tab banana

Banana

@tab orange

Orange

:::

```md
::: tabs#fruit

@tab apple

Apple

@tab banana

Banana

@tab orange

Orange

:::
```

一个没有绑定 id 的水果选项卡列表:

::: tabs

@tab apple

Apple

@tab banana

Banana

@tab orange

Orange

:::

```md
::: tabs

@tab apple

Apple

@tab banana

Banana

@tab orange

Orange

:::
```
