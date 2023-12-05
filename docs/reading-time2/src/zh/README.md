---
home: true
title: 主页
icon: home
heroText: vuepress-plugin-reading-time2
tagline: 预计阅读时间与字数统计生成
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
pnpm add -D vuepress-plugin-reading-time2
```

@tab yarn

```bash
yarn add -D vuepress-plugin-reading-time2
```

@tab npm

```bash
npm i -D vuepress-plugin-reading-time2
```

:::

### 使用

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { readingTimePlugin } from "vuepress-plugin-reading-time2";

export default {
  plugins: [
    readingTimePlugin({
      // 你的选项
    }),
  ],
};
```

@tab JS

```js
// .vuepress/config.js
import { readingTimePlugin } from "vuepress-plugin-reading-time2";

export default {
  plugins: [
    readingTimePlugin({
      // 你的选项
    }),
  ],
};
```

:::
