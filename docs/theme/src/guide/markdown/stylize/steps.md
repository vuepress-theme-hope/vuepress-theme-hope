---
title: Steps
icon: list-ol
category:
  - Markdown
tag:
  - Steps
  - Markdown
---

Show content as progressive steps.

<!-- more -->

## Settings

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    steps: true,
  },
});
```

## Syntax

Wrap an ordered list (or an unordered list) in a `steps` container. Any Markdown syntax is allowed inside the steps.

## Demo

:::: preview

::: steps

1. Create a VuePress project

   ```bash
   pnpm create vuepress-theme-hope my-docs
   ```

2. Install the dependencies

   ```bash
   pnpm install
   ```

3. Start the dev server

   ```bash
   pnpm docs:dev
   ```

:::

::::
