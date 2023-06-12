---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-sass-palette
tagline: VuePress2 的 Sass 调色板插件
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
pnpm add -D vuepress-plugin-sass-palette
```

@tab yarn

```bash
yarn add -D vuepress-plugin-sass-palette
```

@tab npm

```bash
npm i -D vuepress-plugin-sass-palette
```

:::

### 使用

你必须在插件初始化期间调用 `useSassPalettePlugin` 函数来使用此插件。。

::: code-tabs#language

@tab TS

```ts
// 你的插件或主题入口
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import type { PluginFunction } from "@vuepress/core";

export const yourPlugin =
  (options): PluginFunction =>
  (app) => {
    useSassPalettePlugin(app, {
      // 插件选项
    });

    return {
      // 你的插件 API
    };
  };
```

@tab JS

```js
// 你的插件或主题入口
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";

const yourPlugin = (options) => (app) => {
  useSassPalettePlugin(app, {
    // 插件选项
  });

  return {
    // 你的插件 API
  };
};
```

:::
