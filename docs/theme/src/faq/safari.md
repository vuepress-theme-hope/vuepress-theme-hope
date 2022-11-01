---
title: Safari FAQ
icon: safari
category:
  - FAQ
---

## Smooth Scrolling failed

We use the CSS property `scroll-behavior: smooth` to provide smooth scrolling. It has a global approval rating of 87.66% [^scroll-behavior-percent]

[^scroll-behavior-percent]: Data from [canIUse](https://caniuse.com/?search=scroll-behavior).

Currently, this property is only supported on iOS / iPadOS 15.4+ and macOS 12.3+[^scroll-behavior-support].

[^scroll-behavior-support]: See [Safari 15.4 Release Notes](https://developer.apple.com/documentation/safari-release-notes/safari-15_4-release-notes#New-Features)

If you need to use this feature in older versions of Safari, please refer to [Related Stack Overflow Question](https://stackoverflow.com/questions/56011205/is-there-a-safari-equivalent-for-scroll-behavior-smooth) to understand the reason and import [smooth-scroll](https://github.com/iamdustan/smoothscroll) package to make polyfill by yourself.
