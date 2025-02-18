---
title: Dark mode
icon: circle-half-stroke
order: 1
category:
  - Interface
tag:
  - Dark mode
  - Interface
---

The theme supports dark mode and allows you to customize it.

<!-- more -->

## Options

You can config dark mode through `darkmode` in theme options.

```ts twoslash {5} title=".vuepress/config.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    darkmode: "switch", // or "toggle", "auto", "enable", "disable"
  }),
};
```

Available options:

- `"switch"`: switch between dark, light and auto (default)
- `"toggle"`: toggle between light mode and dark mode
- `"auto"`: Automatically decide whether to apply dark mode based on user device's color-scheme or current time
- `"enable"`: only dark mode
- `"disable"`: disable dark mode

::: tip Try it

Toggle the button to see effects: <ColorModeSwitch />

:::

## Getting Status

- In Markdown files or Vue Template, you can access `$isDarkMode` to get dark mode status directly.

- In scripts, you can import `useDarkMode` from `@vuepress/helper/client` to get dark mode status:

  ```ts twoslash
  import { useDarkMode } from "@vuepress/helper/client";

  const isDarkMode = useDarkMode();

  console.log(isDarkMode.value); // get dark mode status
  ```

  If `@vuepress/helper` is not installed, you should install it first:

  ::: code-tabs#shell

  @tab pnpm

  ```bash
  pnpm add -D @vuepress/helper@next
  ```

  @tab yarn

  ```bash
  yarn add -D @vuepress/helper@next
  ```

  @tab npm

  ```bash
  npm i -D @vuepress/helper@next
  ```

  :::

<script setup lang="ts">
import ColorModeSwitch from "@theme-hope/modules/outlook/components/ColorModeSwitch"
</script>
