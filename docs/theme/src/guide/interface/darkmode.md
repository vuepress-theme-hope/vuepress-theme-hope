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

```ts twoslash {4} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  darkmode: "switch", // or "toggle", "auto", "enable", "disable"

  // other options...
});
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

- In Markdown files or Vue Template, you can access `$isDarkMode` to get dark mode status directly:

  ```md
  Darkmode enabled: {{ $isDarkMode }}

  <img v-if="$isDarkMode" src="/dark.png" alt="dark" />
  <img v-else src="/light.png" alt="light" />
  ```

- In scripts, you can import `useDarkMode` from `vuepress-theme-hope/client` to get dark mode status:

  ```ts twoslash
  import { useDarkMode } from "vuepress-theme-hope/client";

  export default {
    setup() {
      const { isDarkMode } = useDarkMode();

      console.log(isDarkMode.value); // get dark mode status
    },
  };
  ```

<script setup lang="ts">
import { ColorModeSwitch } from "vuepress-theme-hope/client";
</script>
