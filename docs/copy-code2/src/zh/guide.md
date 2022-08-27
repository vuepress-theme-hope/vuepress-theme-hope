---
title: 指南
icon: creative
---

## 使用

此插件会自动添加复制按钮到每个代码块的右下角。

默认情况下，按钮仅在桌面模式显示，如果你需要在移动端展示这个按钮，请将 `showInMobile` 设置为 `true`。

在用户点击复制按钮后，屏幕上会显示一个复制成功的提示。默认的提示时长为 2000ms，如果你需要更改这个时长，请设置 `duration`(单位 ms)，如果你不需要这个提示，请将 `duration` 设置为 `0`。

## 演示

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { copyCode } from "vuepress-plugin-copy-code2";

export default {
  plugins: [
    copyCode({
      // 插件选项
    }),
  ],
};
```

@tab JS

```js
// .vuepress/config.js
import { copyCode } from "vuepress-plugin-copy-code2";

export default {
  plugins: [
    copyCode({
      // 插件选项
    }),
  ],
};
```

:::
