---
title: 剧透
icon: eraser
---

在你的 VuePress 站点中添加剧透文字。

<!-- more -->

## 配置

```js {7} title=".vuepress/config.js"
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // 开启剧透
      spoiler: true,
    }),
  ],
};
```

## 语法

使用 `!! !!` 标记剧透剧透文字。请注意两边需要有空格。

::: md-demo 案例

VuePress Theme Hope !!非常强大!!!

:::
