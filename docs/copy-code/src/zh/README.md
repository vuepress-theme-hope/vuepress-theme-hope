---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: "vuepress-plugin-copy-code2"
tagline: 为 VuePress 提供代码块一键复制
actions:
  - text: 快速上手 💡
    link: /zh/guide.html
    type: primary

  - text: 配置 🛠
    link: /zh/config.html

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
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

::: code-group-item ts

```ts
// .vuepress/config.ts
export default {
  plugins: [
    [
      "@mr-hope/copy-code",
      {
        // 你的选项
      },
    ],
  ],
};
```

:::

::: code-group-item js

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      "@mr-hope/copy-code",
      {
        // 你的选项
      },
    ],
  ],
};
```

:::

::::
