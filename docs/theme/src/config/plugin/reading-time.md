---
title: "@mr-hope/reading-time"
category: config
tags:
  - plugin
  - config
---

阅读时间与字数统计 <MyBadge text="v0.3.0+" />

<!-- more -->

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

## 选项

### wordPerminute

- 类型: `number`
- 默认值: `300`

每分钟阅读字数
