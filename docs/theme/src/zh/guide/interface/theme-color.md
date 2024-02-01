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

## 设置默认主题色

你应该在 `.vuepress/styles/palette.scss` 中通过 `$theme-color` 设置站点的默认主题颜色：

```scss
$theme-color: #f00;
```

## 主题色选择器

想要使用它，在 `.vuepress/styles/config.scss` 中通过 `$theme-colors` 设置一系列你想要启用的其他主题色：

```scss
$theme-colors: #2196f3, #f26d6d, #3eaf7c, #fb9b5f;
```

::: tip

上方的默认主题色会成为选择器的第一个颜色。

:::

### 尝试

<!-- markdownlint-disable-->

<ThemeColorPicker :themeColor="themeColor" />

<!-- markdownlint-restore -->

<script setup lang="ts">
import { computed } from "vue";
import { entries, fromEntries } from '@vuepress/helper/client';
import cssVariables from "vuepress-theme-hope/styles/variables.module.scss?module";

import ThemeColorPicker from "@theme-hope/modules/outlook/components/ThemeColorPicker";

const themeColor = fromEntries(
  entries(cssVariables).filter(([key]) => key.startsWith("theme-"))
)
</script>
