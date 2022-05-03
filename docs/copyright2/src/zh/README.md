---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-copyright2
tagline: 在复制时添加版权信息
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

::: code-group-item pnpm

```bash
pnpm add -D vuepress-plugin-copyright2@next
```

:::

::: code-group-item yarn

```bash
yarn add -D vuepress-plugin-copyright2@next
```

:::

::: code-group-item npm

```bash
npm i -D vuepress-plugin-copyright2@next
```

:::

::::

### 使用

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { copyrightPlugin } from "vuepress-plugin-copyright2";

export default {
  plugins: [
    copyright({
      // 插件选项
    }),
  ],
};
```

:::

::: code-group-item JS

```js
// .vuepress/config.js
const { copyrightPlugin } = require("vuepress-plugin-copyright2");

module.exports = {
  plugins: [
    copyrightPlugin({
      // 插件选项
    }),
  ],
};
```

:::

::::
