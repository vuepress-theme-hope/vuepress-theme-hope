---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: "@mr-hope/vuepress-plugin-reading-time"
tagline: Expect reading time and word count statistics
footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
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

<CodeGroup>
<CodeGroupItem title="yarn">

```bash
yarn add -D @mr-hope/vuepress-plugin-reading-time
```

</CodeGroupItem>

<CodeGroupItem title="npm">

```bash
npm i -D @mr-hope/vuepress-plugin-reading-time
```

</CodeGroupItem>
</CodeGroup>

### Usage

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      "@mr-hope/reading-time",
      {
        // your options
      },
    ],
  ],
};
```

</CodeGroupItem>

<CodeGroupItem title="ts">

```ts
// .vuepress/config.ts
export default {
  plugins: [
    [
      "@mr-hope/reading-time",
      {
        // your options
      },
    ],
  ],
};
```

</CodeGroupItem>
</CodeGroup>

## Plugin options

### wordPerminute

- Type: `number`
- Default: `300`

Reading speed (words per minute)
