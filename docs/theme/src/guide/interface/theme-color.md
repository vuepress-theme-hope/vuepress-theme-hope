---
title: Theme Color
icon: palette
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

You can disable it by setting the theme field’s `themeConfig.themeColor` to `false`.

## Custom ThemeColor

You need to configure `themeConfig.themeColor` in the format `{ colorname1: colorvalue, colorname2: colorvalue, ... }`:

::::: details Example

:::: code-group

::: code-group-item TS

```ts {6-11}
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    themeColor: {
      blue: "#2196f3",
      red: "#f26d6d",
      green: "#3eaf7c",
      orange: "#fb9b5f",
    },
  },
});
```

:::

::: code-group-item JS

```js {6-11}
// .vuepress/config.js
const { defineHopeConfig } = require("vuepress-theme-hope");

module.exports = defineHopeConfig({
  themeConfig: {
    themeColor: {
      blue: "#2196f3",
      red: "#f26d6d",
      green: "#3eaf7c",
      orange: "#fb9b5f",
    },
  },
});
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
