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

You should set the default theme color of your site in `.vuepress/styles/config.scss` through `$theme-color`:

```scss
$theme-color: #3eaf7c;
```

You can set different colors for light mode and dark mode:

```scss
$theme-color: (
  light: rgb(59, 186, 129),
  dark: rgb(30, 140, 90),
);
```

If you set multiple theme colors, the first color will become the default theme color, and the theme will provide a theme color picker:

```scss
$theme-color: #3eaf7c, #2196f3, #f26d6d, #fb9b5f;
```

You can also explicitly specify the colors for light mode and dark mode for one or more theme colors at the same time:

```scss
$theme-color: (
  (
    light: rgb(59, 186, 129),
    dark: rgb(30, 140, 90),
  ),
  #2196f3,
  #f26d6d,
  #fb9b5f
);
```

### Try it

<ThemeColorPicker :themeColors="themeColors" />

<script setup lang="ts">
import { computed } from "vue";
import { entries, fromEntries } from '@vuepress/helper/client';
import cssVariables from "vuepress-theme-hope/styles/variables.module.scss";

import ThemeColorPicker from "@theme-hope/modules/outlook/components/ThemeColorPicker";

const themeColors = fromEntries(
  entries(cssVariables).filter(([key]) => key.startsWith("theme-"))
)
</script>
