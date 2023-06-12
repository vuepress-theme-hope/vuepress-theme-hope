---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-copyright2
tagline: 在复制时添加版权信息
actions:
  - text: 快速上手 💡
    link: ./guide.html
    type: primary

  - text: 配置 🛠
    link: ./config.html

footer: 使用 <a href="https://theme-hope.vuejs.press/zh/" target="_blank">VuePress Theme Hope</a> 主题 | MIT 协议, 版权所有 © 2019-present Mr.Hope

copyright: false
---

## 使用插件

### 安装

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-copyright2
```

@tab yarn

```bash
yarn add -D vuepress-plugin-copyright2
```

@tab npm

```bash
npm i -D vuepress-plugin-copyright2
```

:::

### 使用

::: code-tabs#language

@tab TS

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

@tab JS

```js
// .vuepress/config.js
import { copyrightPlugin } from "vuepress-plugin-copyright2";

export default {
  plugins: [
    copyrightPlugin({
      // 插件选项
    }),
  ],
};
```

:::
