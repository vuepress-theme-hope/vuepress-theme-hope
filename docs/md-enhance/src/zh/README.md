---
home: true
title: 主页
icon: home
bgImage: https://theme-hope-assets.vuejs.press/bg/6-light.svg
bgImageDark: https://theme-hope-assets.vuejs.press/bg/6-dark.svg
bgImageStyle:
  background-attachment: fixed
heroText: vuepress-plugin-md-enhance
tagline: 为 VuePress2 提供更多 Markdown 增强功能
actions:
  - text: 指南
    icon: lightbulb
    link: ./guide/
    type: primary

  - text: 配置
    icon: tools
    link: ./config.html

highlights:
  - header: 展示你的代码和工作
    image: /assets/image/code.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/4-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/4-dark.svg
    highlights:
      - title: 代码案例
        icon: laptop-code
        details: 你可以很方便的插入代码案例
        link: ./guide/code/demo/

      - title: 交互演示
        icon: code
        details: 你可以在 Markdown 中添加交互演示
        link: ./guide/code/playground.html

      - title: Kotlin 交互演示
        icon: b:kickstarter
        details: 响应式的 Kotlin Playground
        link: ./guide/code/kotlin-playground.html

      - title: Vue 交互演示
        icon: b:vuejs
        details: 在交互演示中展示 Vue 组件
        link: ./guide/code/vue-playground.html

      - title: Sandpack 交互演示
        icon: code
        details: Sandpack 驱动的实时的编码环境
        link: ./guide/code/sandpack.html

footer: 使用 <a href="https://theme-hope.vuejs.press/zh/" target="_blank">VuePress Theme Hope</a> 主题 | MIT 协议, 版权所有 © 2019-至今 Mr.Hope

copyright: false
---

## 安装

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-md-enhance
```

@tab yarn

```bash
yarn add -D vuepress-plugin-md-enhance
```

@tab npm

```bash
npm i -D vuepress-plugin-md-enhance
```

:::

## 使用

::: code-tabs#language

@tab TS

```ts title=".vuepress/config.ts"
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // 你的选项
    }),
  ],
};
```

@tab JS

```js title=".vuepress/config.js"
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // 你的选项
    }),
  ],
};
```

:::

## 从 V1 迁移

详见 [迁移指南](./migration.md)。
