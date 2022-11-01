---
title: Цвет темы
icon: palette
order: 2
category:
  - Интерфейс
tag:
  - Интерфейс
  - Цвет темы
---

Тема позволяет вам настроить цвет темы и даже предоставить средство выбора.

<!-- more -->

## Настройка цвета темы по умолчанию

Вы должны установить цвет темы вашего сайта по умолчанию в `.vuepress/styles/palette.scss`:

```scss
$theme-color: #f00;
```

## Палитра цветов темы

Вам нужно установить `themeColor` с форматом `{ colorName1: colorValue1, colorName2: colorValue2, ... }`:

Первый цвет — это цвет темы по умолчанию выше.

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
import { hopeTheme } from "vuepress-theme-hope";

export default {
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

### Попробуй это

<ThemeColorPicker :themeColor="themeColor" />

<script setup lang="ts">
import { computed } from "vue";
import { useThemeData } from "@theme-hope/composables/index.js";
import ThemeColorPicker from "@theme-hope/modules/outlook/components/ThemeColorPicker.js";

const themeData = useThemeData();

const themeColor = computed(() => {
  const { themeColor } = themeData.value;

  return themeColor === false ? null : themeColor;
});
</script>
