---
title: Darkmode
icon: circle-half-stroke
order: 1
category:
  - Interface
tag:
  - Darkmode
  - Interface
---

In dark mode, the page uses a dark background to make you comfortable.

<!-- more -->

## Try it

Toggle the button below to see effects.

<AppearanceSwitch />

## Options

You can config darkmode through `darkmode` in theme options.

```js {5} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    darkmode: "your option",
  }),
};
```

Available options:

- `"switch"`: switch between dark, light and auto (default)
- `"toggle"`: toggle between lightmode and darkmode
- `"auto"`: Automatically decide whether to apply dark mode based on user device's color-scheme or current time
- `"enable"`: only dark mode
- `"disable"`: disable dark mode

## Getting Status

- You can use `$isDarkmode` in Markdown files or Vue Template to get darkmode status.
- You can import `useDarkmode` from `vuepress-theme-hope/client` to get darkmode status:

  ```ts
  import { useDarkmode } from "vuepress-theme-hope/client";

  const { isDarkmode } = useDarkmode();

  console.log(isDarkmode.value); // get darkmode status
  ```

<script setup lang="ts">
import AppearanceSwitch from "@theme-hope/modules/outlook/components/AppearanceSwitch"
</script>
