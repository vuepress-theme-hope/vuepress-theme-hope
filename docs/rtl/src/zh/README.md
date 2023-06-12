---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-rtl
tagline: RTL 布局插件

footer: 使用 <a href="https://theme-hope.vuejs.press/zh/" target="_blank">VuePress Theme Hope</a> 主题 | MIT 协议, 版权所有 © 2019-present Mr.Hope
copyright: false
---

## 使用插件

### 安装

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-rtl
```

@tab yarn

```bash
yarn add -D vuepress-plugin-rtl
```

@tab npm

```bash
npm i -D vuepress-plugin-rtl
```

:::

### 使用

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { rtlPlugin } from "vuepress-plugin-rtl";

export default {
  plugins: [
    rtlPlugin({
      // 你的选项
    }),
  ],
};
```

@tab JS

```js
// .vuepress/config.js
import { rtlPlugin } from "vuepress-plugin-rtl";

export default {
  plugins: [
    rtlPlugin({
      // 你的选项
    }),
  ],
};
```

:::

## 插件选项

### locales

- 类型: `string[]`
- 默认值: `['/']`

开启 RTL 布局的多语言路径。

### selector

- 类型: `SelectorOptions`

  ```ts
  interface SelectorOptions {
    [element: string]: {
      [attrs: string]: string;
    };
  }
  ```

- 默认值: `{ 'html': { dir: 'rtl' } }`

开启 RTL 的选择器。

默认设置意味着在 RTL 多语言中，`html` 元素的 `dir` 属性将被设置为 `rtl`。
