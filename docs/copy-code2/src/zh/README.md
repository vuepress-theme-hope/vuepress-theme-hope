---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-copy-code2
tagline: 为 VuePress2 提供代码块一键复制
actions:
  - text: 快速上手 💡
    link: /zh/guide.html
    type: primary

  - text: 配置 🛠
    link: /zh/config.html

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyright: false
---

## 使用插件

### 安装

:::: code-group

::: code-group-item yarn

```bash
yarn add -D vuepress-plugin-copy-code2@next
```

:::

::: code-group-item npm

```bash
npm i -D vuepress-plugin-copy-code2@next
```

:::

::::

### 使用

:::: code-group

::: code-group-item TS

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

:::

::: code-group-item JS

```js
// .vuepress/config.js
const { copyCode } = require("vuepress-plugin-copy-code2");

module.exports = {
  plugins: [
    copyCode({
      // 插件选项
    }),
  ],
};
```

:::

::::

## 从 V1 迁移

我们提供了一个新的 `pure` 选项，可以在语言文本旁边添加一个小按钮。

如果您认为默认样式太花哨，请设置此选项。
