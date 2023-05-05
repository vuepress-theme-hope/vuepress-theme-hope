---
title: Task list
icon: square-check
category:
  - Markdown
tag:
  - Markdown
  - Task List
---

Let the Markdown file in your VuePress site support task list.

<!-- more -->

## Config

::: code-tabs#language

@tab TS

```ts {8-10}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        tasklist: true,
      },
    },
  }),
});
```

@tab JS

```js {7-9}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        tasklist: true,
      },
    },
  }),
};
```

:::

## Syntax

- Use `- [ ] some text` to render an unchecked task item.
- Use `- [x] some text` to render a checked task item. (Capital `X` is also supported)

## Demo

- [ ] Plan A
- [x] Plan B

```md
- [ ] Plan A
- [x] Plan B
```
