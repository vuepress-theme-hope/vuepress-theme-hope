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

## Settings

```ts {7} title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    markdown: {
      tasklist: true,
    },
  }),
});
```

## Syntax

- Use `- [ ] some text` to render an unchecked task item.
- Use `- [x] some text` to render a checked task item. (Capital `X` is also supported)

::: md-demo Demo

- [ ] Plan A
- [x] Plan B

:::

## Advanced

Besides setting `markdown.tasklist: true` in theme options, you can also pass objects as options:

```ts {7-21} title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    markdown: {
      tasklist: {
        /**
         * Whether disable checkbox
         *
         * @default true
         */
        disabled: false,

        /**
         * Whether use `<label>` to wrap text
         *
         * @default true
         */
        label: false,
      },
    },
  }),
});
```
