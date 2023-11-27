---
title: V2 Migration
icon: code-compare
---

Renamed from `@mr-hope/vuepress-plugin-comment` to `vuepress-plugin-comment2`. ⚠

## Breaking Changes

- `type` is renamed to `provider`, and requires the first character to be capitalized ![breaking](https://img.shields.io/badge/-breaking-red)

  ```js
  // before
  ['comment', { type: 'vssue', ... }],
  // after
  commentPlugin({ provider: 'Vssue', ... }),
  ```

## New Features

- Adds support for `artalk`, `twikoo` and `giscus` ![New](https://img.shields.io/badge/-New-brightgreen)

- Now, you can use [defineArtalkConfig](./config/artalk.md#client-config), [defineWalineConfig](./config/waline.md#client-config), [defineTwikooConfig](./config/twikoo.md#client-config) and [defineGiscusConfig](./config/giscus.md#client-config) to define your comment service config on the client side.

## Removed

- Vssue is currently missing ![warning](https://img.shields.io/badge/-warning-yellow)

  Vssue is written in Vue2, and the author [meteorlxy](https://github.com/meteorlxy) has not yet made it compatible with Vue3 yet

- Valine is removed ![removed](https://img.shields.io/badge/-removed-red)

  Valine is lack of maintenance and can leak your privacy. You should use [Waline](https://waline.js.org) instead.
