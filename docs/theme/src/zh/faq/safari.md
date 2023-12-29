---
title: Safari 常见问题
icon: fab fa-safari
order: -1
category:
  - FAQ
---

## 平滑滚动不生效

我们使用 CSS 属性 `scroll-behavior: smooth` 来提供平滑滚动。它在全球有 93.06% 的支持率[^scroll-behavior-percent]

[^scroll-behavior-percent]: 数据来自 [canIUse](https://caniuse.com/?search=scroll-behavior)。

目前，只有 iOS 和 iPadOS 15.4 及以上，macOS 12.3 及以上支持该属性[^scroll-behavior-support]。

[^scroll-behavior-support]: 详见 [Safari 15.4 发行日志](https://developer.apple.com/documentation/safari-release-notes/safari-15_4-release-notes#New-Features)

如果你需要在旧版本的 Safari 使用这个功能，请自行参考 [Stack Overflow 问答](https://stackoverflow.com/questions/56011205/is-there-a-safari-equivalent-for-scroll-behavior-smooth) 了解原因，并自行引入 [smooth-scroll](https://github.com/iamdustan/smoothscroll) 包进行兼容。
