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

::: tip 尝试一下

切换按钮以查看效果: <ColorModeSwitch />

:::

## 获取状态

- 在 Markdown 文件或 Vue 模板中，你可以直接获取 `$isDarkmode` 来获取当前是否为深色模式。

- 在脚本中，你可以通过 `@pnpm add -D @vuepress/helper@next` 安装插件来获取深色模式状态:

  ```ts
  import { useDarkmode } from "@vuepress/helper/client";

  const isDarkmode = useDarkmode();

  console.log(isDarkmode.value); // get darkmode status
  ```

<script setup lang="ts">
import ColorModeSwitch from "@theme-hope/modules/outlook/components/ColorModeSwitch"
</script>
