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

这是一个开箱即用的功能，除了你的主题色之外，还提供 “红、蓝、绿、橙、紫” 五种颜色主题。你也可以定制自己的主题色选择列表。

<!-- more -->

## 尝试

<!-- markdownlint-disable-->

<ThemeColorPicker :themeColor="themeColor" />

<!-- markdownlint-restore -->

## 禁用功能

你可以在主题选中设置 `themeColor: false` 来禁用它。

## 自定义主题色

你需要按照 `{ 颜色名1: 颜色值, 颜色名2: 颜色值, ... }` 的格式在主题选项中配置 `themeColor`:

:::: details 例子

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
