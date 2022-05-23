---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-reading-time2
tagline: 预计阅读时间与字数统计生成
footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyright: false
---

这个插件将会向 page 对象注入预计阅读时间与字数统计。

会自动向 page 对象注入 `readingTime`:

```ts
interface ReadingTime {
  /** 分钟数 */
  minutes: number;
  /** 字数 */
  words: number;
}
```

## 使用插件

### 安装

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-reading-time2@next@next
```

@tab yarn

```bash
yarn add -D vuepress-plugin-reading-time2@next
```

@tab npm

```bash
npm i -D vuepress-plugin-reading-time2@next
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
const { readingTimePlugin } = require("vuepress-plugin-reading-time2");

module.exports = {
  plugins: [
    readingTimePlugin({
      // 你的选项
    }),
  ],
};
```

:::

## 插件选项

### wordPerMinute

- 类型: `number`
- 默认值: `300`

每分钟阅读字数

### locales

- 类型: `ReadingTimeLocaleConfig`

  ```ts
  interface ReadingTimeLocaleData {
    /**
     * 字数模板，模板中 `$word` 会被自动替换为字数
     */
    word: string;

    /**
     * 小于一分钟文字
     */
    less1Minute: string;

    /**
     * 时间模板
     */
    time: string;
  }

  interface ReadingTimeLocaleConfig {
    [localePath: string]: ReadingTimeLocaleData;
  }
  ```

- 必填: 否

阅读时间插件的国际化配置。
