---
title: Theme Color
icon: palette
order: 2
category:
  - Interface
tag:
  - Interface
  - Theme Color
---

The theme allows you to customize theme color and even provide a picker.

<!-- more -->

## Setting Default Theme Color

You should set the default theme color of your site in `.vuepress/styles/palette.scss`:

```scss
$theme-color: #f00;
```

## Theme Color Picker

You need to set `themeColor` with `{ colorname1: colorvalue, colorname2: colorvalue, ... }` format:

The first color is the default theme color above.

:::: details Example

::: code-tabs#language

@tab TS

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

@tab JS

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

### Try it

<!-- markdownlint-disable-->

<ThemeColorPicker :themeColor="themeColor" />

<!-- markdownlint-restore -->

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
