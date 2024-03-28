---
title: Vue 交互演示
icon: fab fa-vuejs
category:
  - Markdown
tag:
  - Markdown
  - 交互演示
---

::: tip

由于我们提供了一个运行时编译器，我们引入了带有 TypeScript 支持的整个 `@vue/compiler-sfc` 包，因此整个 Vue Playground 块大于 4MB。 因此，只有在严重依赖交互式 Vue Playground 时才应使用它。

你可以使用 [Vue Demo](./demo.md) 和 [交互演示 Vue 预设](./playground.md#vue) 作为替代。

:::

<!-- @include: @md-enhance/zh/guide/code/vue-playground.md#settings -->

```js {7} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        vuePlayground: true,
      },
    },
  }),
};
```

<!-- @include: @md-enhance/zh/guide/code/vue-playground.md#after -->
