---
title: 标记
icon: highlighter
---

让你的 VuePress 站点中的 Markdown 文件支持标记。

<!-- more -->

## 配置

```js {7} title=".vuepress/config.js"
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // 开启标记
      mark: true,
    }),
  ],
};
```

## 语法

使用 `== ==` 进行标记。请注意两边需要有空格。

::: md-demo 案例

VuePress Theme Hope ==非常== 强大!

:::
