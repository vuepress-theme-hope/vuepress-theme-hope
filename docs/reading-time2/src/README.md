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

:::: code-group

::: code-group-item yarn

```bash
yarn add -D vuepress-plugin-reading-time2
```

:::

::: code-group-item npm

```bash
npm i -D vuepress-plugin-reading-time2
```

:::

::::

### Usage

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { readingTime } from "vuepress-plugin-reading-time2";

export default {
  plugins: [
    readingTime({
      // your options
    }),
  ],
};
```

:::

::: code-group-item JS

```js
// .vuepress/config.js
const { readingTime } = require("vuepress-plugin-reading-time2");

module.exports = {
  plugins: [
    readingTime({
      // your options
    }),
  ],
};
```

:::

::::

## Plugin options

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
