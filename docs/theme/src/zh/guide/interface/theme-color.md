---
title: 主题色
icon: palette
order: 2
category:
  - 界面
tag:
  - 界面
  - 主题色
---

主题允许你自定义主题颜色，甚至提供选择器。

<!-- more -->

## 设置主题色

你应该在 `.vuepress/styles/config.scss` 中通过 `$theme-color` 设置站点的主题颜色：

```scss
$theme-color: #3eaf7c;
```

你可以为日间模式和夜间模式设置不同的颜色：

```scss
$theme-color: (
  light: rgb(59, 186, 129),
  dark: rgb(30, 140, 90),
);
```

如果你设置多个主题色，第一个颜色会成为默认主题色，并且主题会提供一个主题色选择器：

```scss
$theme-color: #3eaf7c, #2196f3, #f26d6d, #fb9b5f;
```

你也可以同时为一个或多个主题色显式指定日间和夜间模式的颜色：

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

### 尝试

<!-- markdownlint-disable-->

<ThemeColorPicker :themeColors="themeColors" />

<!-- markdownlint-restore -->

<script setup lang="ts">
import { computed } from "vue";
import { entries, fromEntries } from '@vuepress/helper/client';
import cssVariables from "vuepress-theme-hope/styles/variables.module.scss";

import ThemeColorPicker from "@theme-hope/modules/outlook/components/ThemeColorPicker";

const themeColors = fromEntries(
  entries(cssVariables).filter(([key]) => key.startsWith("theme-"))
)
</script>
