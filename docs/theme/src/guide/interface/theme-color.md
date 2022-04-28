---
title: Theme Color
icon: palette
index: 2
category:
  - Interface
tag:
  - Interface
  - Theme Color
---

This is an out-of-the-box feature that offers five theme color "red, blue, green, orange and purple" besides your theme color. You can also use your own theme color list.

<!-- more -->

## Try it

<!-- markdownlint-disable-->

<ThemeColorPicker :themeColor="themeColor" />

<!-- markdownlint-restore -->

## Disable

You can disable it by setting `themeColor: false` in theme options.

## Customize ThemeColor

You need to set `themeColor` with `{ colorname1: colorvalue, colorname2: colorvalue, ... }` format:

::::: details Example

:::: code-group

::: code-group-item TS

```ts {7-12}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    themeColor: {
      blue: "#2196f3",
      red: "#f26d6d",
      green: "#3eaf7c",
      orange: "#fb9b5f",
    },
  }),
});
```

:::

::: code-group-item JS

```js {6-11}
// .vuepress/config.js
const { hopeTheme } = require("vuepress-theme-hope");

module.exports = {
  theme: hopeTheme({
    themeColor: {
      blue: "#2196f3",
      red: "#f26d6d",
      green: "#3eaf7c",
      orange: "#fb9b5f",
    },
  }),
};
```

:::

::::

:::::

<script setup lang="ts">
import { computed } from 'vue';
import { useThemeData } from '@theme-hope/composables';
import ThemeColorPicker from '@theme-hope/module/outlook/components/ThemeColorPicker';

const themeData = useThemeData();

const themeColor = computed(() => {
  const { themeColor } = themeData.value;

  return themeColor === false ? null : themeColor;
});
</script>
