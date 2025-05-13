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

主题支持深色模式并允许你自定义它。

<!-- more -->

## 选项

你可以在主题选项中通过 `darkmode` 来配置深色模式。

```ts twoslash {4} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  darkmode: "switch", // 或 "toggle", "auto", "enable", "disable"

  // 其他选项...
});
```

可选的值:

- `"switch"`: 在深色模式，浅色模式和自动之间切换 (默认)
- `"toggle"`: 在深色模式和浅色模式之间切换
- `"auto"`: 自动根据用户设备主题或当前时间决定是否应用深色模式
- `"enable"`: 强制深色模式
- `"disable"`: 禁用深色模式

::: tip 尝试一下

切换按钮以查看效果: <ColorModeSwitch />

:::

## 获取状态

- 在 Markdown 文件或 Vue 模板中，你可以直接获取 `$isDarkMode` 来获取当前是否为深色模式。

  ```md
  Darkmode enabled: {{ $isDarkMode }}

  <img v-if="$isDarkMode" src="/dark.png" alt="dark" />
  <img v-else src="/light.png" alt="light" />
  ```

- 在脚本中，你可以从 `vuepress-theme-hope/client` 导入 `useDarkMode` 来获取深色模式状态:

  ```ts twoslash
  import { useDarkMode } from "vuepress-theme-hope/client";

  export default {
    setup() {
      const { isDarkMode } = useDarkMode();

      console.log(isDarkMode.value); // 获取深色模式状态
    },
  };
  ```

<script setup lang="ts">
import { ColorModeSwitch } from "vuepress-theme-hope/client";
</script>
