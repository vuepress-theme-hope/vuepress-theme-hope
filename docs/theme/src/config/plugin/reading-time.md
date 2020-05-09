---
category: config
tags:
  - plugin
  - config
---

# @mr-hope/reading-time <MyBadge text="v0.3.0+" />

这个插件将会向 page 对象注入阅读时间与字数统计。

会自动向 page 对象注入 `readingTime`:

```ts
interface ReadingTime {
  /** 分钟数 */
  minutes: number;
  /** 字数 */
  words: number;
}
```
