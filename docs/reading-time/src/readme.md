---
home: true
title: "@mr-hope/vuepress-plugin-reading-time"
icon: homefill
heroImage: /logo.svg
heroText: "@mr-hope/vuepress-plugin-reading-time"
tagline: Words and reading time counter
footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---

Expect eading time and word count statistics

This plugin will inject reading time and word count statistics into the page object.

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

```bash
npm i -D @mr-hope/vuepress-plugin-reading-time
```

Or

```bash
yarn add -D @mr-hope/vuepress-plugin-reading-time
```

### Usage

```js {3-7}
// .vuepress/config.js
module.exports = {
  plugin: [
    "@mr-hope/reading-time",
    {
      // your options
    },
  ],
};
```

## Plugin options

### wordPerminute

- 类型: `number`
- 默认值: `300`

Reading speed (words per minute)
