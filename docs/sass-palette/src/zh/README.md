---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-sass-palette
tagline: VuePress2 的 Sass 调色板插件
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

::: code-tabs

@codetab pnpm

```bash
pnpm add -D vuepress-plugin-sass-palette@next
```

@codetab yarn

```bash
yarn add -D vuepress-plugin-sass-palette@next
```

@codetab npm

```bash
npm i -D vuepress-plugin-sass-palette@next
```

:::

### 使用

你必须在插件初始化期间调用 `useSassPalettePlugin` 函数来使用此插件。。

::: code-tabs

@codetab TS

```ts
// 你的插件或主题入口
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import type { PluginFunction } from "@vuepress/core";

const yourPlugin =
  (options): PluginFunction =>
  (app) => {
    useSassPalettePlugin(app, {
      // 插件选项
    });

    return {
      // 你的插件 API
    };
  };

export default yourPlugin;
```

@codetab JS

```js
// 你的插件或主题入口
const { useSassPalettePlugin } = require("vuepress-plugin-sass-palette");

module.exports = (options) => (app) => {
  useSassPalettePlugin(app, {
    // 插件选项
  });

  return {
    // 你的插件 API
  };
};
```

:::
