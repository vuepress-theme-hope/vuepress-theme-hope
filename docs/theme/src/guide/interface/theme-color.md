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

You should set the default theme color of your site in `.vuepress/styles/palette.scss` through `$theme-color`:

```scss
$theme-color: #f00;
```

## Theme Color Picker {#theme-color-picker-title}

Top use it, set a list of theme colors you want to use in `.vuepress/styles/config.scss` with `$theme-colors`:

```scss
$theme-colors: #2196f3, #f26d6d, #3eaf7c, #fb9b5f;
```

::: tip

The default theme color above will always be the first one in picker.

:::

### Try it

<ThemeColorPicker :themeColor="themeColor" />

<script setup lang="ts">
import { computed } from "vue";
import { entries, fromEntries } from 'vuepress-shared/client';
import cssVariables from "vuepress-theme-hope/styles/variables.module.scss?module";

import ThemeColorPicker from "@theme-hope/modules/outlook/components/ThemeColorPicker";

const themeColor = fromEntries(
  entries(cssVariables).filter(([key]) => key.startsWith("theme-"))
)
</script>
