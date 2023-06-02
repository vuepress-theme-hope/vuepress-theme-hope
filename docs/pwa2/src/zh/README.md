---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-pwa2
tagline: 渐进式网页应用 (Progressive Web App) 支持
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
pnpm add -D vuepress-plugin-pwa2
```

@tab yarn

```bash
yarn add -D vuepress-plugin-pwa2
```

@tab npm

```bash
npm i -D vuepress-plugin-pwa2
```

:::

### 使用

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { pwaPlugin } from "vuepress-plugin-pwa2";

export default {
  plugins: [
    pwaPlugin({
      // 你的选项
    }),
  ],
};
```

@tab JS

```js
// .vuepress/config.js
import { pwaPlugin } from "vuepress-plugin-pwa2";

export default {
  plugins: [
    pwaPlugin({
      // 你的选项
    }),
  ],
};
```

:::

::: tip

如果你正在使用本插件，我们推荐在你的 VuePress 配置文件中设置 `shouldPrefetch: false`。

:::
