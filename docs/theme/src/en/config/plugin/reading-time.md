---
category: config
tags:
  - plugin
  - config
---

# @mr-hope/reading-time <MyBadge text="v0.3.0+" />

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
