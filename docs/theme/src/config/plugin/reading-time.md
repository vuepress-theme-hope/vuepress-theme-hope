---
title: "@mr-hope/reading-time"
category: config
tags:
  - plugin
  - config
---

Expect eading time and word count statistics

<!-- more -->

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

## Options

### wordPerminute

- 类型: `number`
- 默认值: `300`

Reading speed (words per minute)
