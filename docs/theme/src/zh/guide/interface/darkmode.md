---
title: 深色模式
icon: circle-half-stroke
order: 1
category:
  - 界面
tag:
  - 界面
  - 深色模式
---

在深色模式下，页面会使用深色背景与浅色文字，以让你更加舒适。

<!-- more -->

## 尝试

切换下面的按钮以查看效果。

<AppearanceSwitch />

## 选项

你可以在主题选项中通过 `darkmode` 来配置深色模式。

```js {5} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    darkmode: "你的选项",
  }),
};
```

可选的值:

- `"switch"`: 在深色模式，浅色模式和自动之间切换 (默认)
- `"toggle"`: 在深色模式和浅色模式之间切换
- `"auto"`: 自动根据用户设备主题或当前时间决定是否应用深色模式
- `"enable"`: 强制深色模式
- `"disable"`: 禁用深色模式

## 获取状态

- 你可以在 Markdown 文件或 Vue 模板中通过 `$isDarkmode` 来获取当前是否为深色模式。

- 你可以从 `vuepress-theme-hope/client` 导入 `useDarkmode` 来获取深色模式状态:

  ```ts
  import { useDarkmode } from "vuepress-theme-hope/client";

  const { isDarkmode } = useDarkmode();

  console.log(isDarkmode.value); // get darkmode status
  ```

<script setup lang="ts">
import AppearanceSwitch from "@theme-hope/modules/outlook/components/AppearanceSwitch"
</script>
