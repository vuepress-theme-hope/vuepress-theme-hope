---
home: true
title: 主页
icon: home
heroText: vuepress-plugin-copy-code2
tagline: 为 VuePress2 提供代码块一键复制
actions:
  - text: 快速上手
    icon: lightbulb
    link: ./guide.html
    type: primary

  - text: 配置
    icon: tools
    link: ./config.html

footer: 使用 <a href="https://theme-hope.vuejs.press/zh/" target="_blank">VuePress Theme Hope</a> 主题 | MIT 协议, 版权所有 © 2019-present Mr.Hope

copyright: false
---

## 使用插件

### 安装

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-copy-code2
```

@tab yarn

```bash
yarn add -D vuepress-plugin-copy-code2
```

@tab npm

```bash
npm i -D vuepress-plugin-copy-code2
```

:::

### 使用

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { copyCodePlugin } from "vuepress-plugin-copy-code2";

export default {
  plugins: [
    copyCodePlugin({
      // 插件选项
    }),
  ],
};
```

@tab JS

```js
// .vuepress/config.js
import { copyCodePlugin } from "vuepress-plugin-copy-code2";

export default {
  plugins: [
    copyCodePlugin({
      // 插件选项
    }),
  ],
};
```

:::

## 从 V1 迁移

详见 [迁移指南](./migration.md)
