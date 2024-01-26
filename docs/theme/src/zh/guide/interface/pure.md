---
title: 纯净模式
icon: leaf
order: -2
category:
  - 界面
tag:
  - 界面
---

如果你的网站是一个纯文档站点，并且你更喜欢干净的样式，你可以在主题选项中设置 `pure: true` 启用纯净模式。

::: code-tabs#language

@tab TS

```ts {7} title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    pure: true,
  }),
});
```

@tab JS

```js {7} title=".vuepress/config.js"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    pure: true,
  }),
});
```

:::

在这个模式下，我们会禁用一些花哨的动画以及一些色彩，只提供功能。
