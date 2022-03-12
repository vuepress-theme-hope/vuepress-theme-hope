---
title: 主题色
icon: palette
category:
  - 界面
tag:
  - 界面
  - 主题色
---

这是一个开箱即用的功能，除了你的主题色之外，还提供 “红、蓝、绿、橙、紫” 五种颜色主题。你也可以定制自己的主题色选择列表。

<!-- more -->

## 尝试

<!-- markdownlint-disable-->

<ThemeColorPicker :themeColor="themeColor" />

<!-- markdownlint-restore -->

## 禁用功能

你可以将 `themeConfig` 的 `themeColor` 设置为 `false` 来禁用它。

## 自定义主题色

你需要按照 `{ 颜色名1: 颜色值, 颜色名2: 颜色值, ... }` 的格式来配置 `themeConfig.themeColor`:

::::: details 例子

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
