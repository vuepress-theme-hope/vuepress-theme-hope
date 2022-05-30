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

主题允许您自定义主题颜色，甚至提供选择器。

<!-- more -->

## 设置默认主题色

您应该在 `.vuepress/styles/palette.scss` 中设置站点的默认主题颜色：

```scss
$theme-color: #f00;
```

## 主题色选择器

你需要按照 `{ 颜色名1: 颜色值, 颜色名2: 颜色值, ... }` 的格式在主题选项中配置 `themeColor`:

第一个颜色为上方设置的默认主题色。

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

### 尝试

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
