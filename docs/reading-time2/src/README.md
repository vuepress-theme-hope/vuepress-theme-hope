---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-reading-time2
tagline: Expect reading time and word count statistics
footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyright: false
---

This plugin will inject expect reading time and word count statistics into the page object.

Will automatically inject `readingTime` into the page object:

```ts
interface ReadingTime {
  /** Expect reading minute */
  minutes: number;
  /** Words count */
  words: number;
}
```

## How to use

### Install

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-reading-time2@next
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

### Usage

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { readingTimePlugin } from "vuepress-plugin-reading-time2";

export default {
  plugins: [
    readingTimePlugin({
      // your options
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
      // your options
    }),
  ],
};
```

:::

## Plugin Options

### wordPerMinute

- Type: `number`
- Default: `300`

Reading speed (words per minute)

### locales

- Type: `ReadingTimeLocaleConfig`

  ```ts
  interface ReadingTimeLocaleData {
    /**
     * Word template, `$word` will be automatically replaced by actual words
     */
    word: string;

    /**
     * Text for less than one minute
     */
    less1Minute: string;

    /**
     * Time template
     */
    time: string;
  }

  interface ReadingTimeLocaleConfig {
    [localePath: string]: ReadingTimeLocaleData;
  }
  ```

- Required: No

Locales config for reading-time plugin.
