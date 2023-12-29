---
title: 迁移至 V2
icon: code-compare
---

从 `@mr-hope/vuepress-plugin-comment` 重命名为 `vuepress-plugin-comment2`。 ⚠

## 破坏性变更

- `type` 重命名为 `provider`，并且要求首字母大写 ![破坏性](https://img.shields.io/badge/-破坏性-red)

  ```js
  // before
  ['comment', { type: 'vssue', ... }],
  // after
  commentPlugin({ provider: 'Vssue', ... }),
  ```

## 新功能

- 添加 `artalk`、`twikoo` 和 `giscus` 评论服务的支持 ![新增](https://img.shields.io/badge/-New-brightgreen)

- 现在，你可以使用在客户端通过 [defineArtalkConfig](./config/artalk.md#客户端配置)、[defineWalineConfig](./config/waline.md#客户端配置)、 [defineTwikooConfig](./config/twikoo.md#客户端配置) 和 [defineGiscusConfig](./config/giscus.md#客户端配置) 来定义你的评论服务配置了。

## 移除

- Vssue 目前缺失 ![警告](https://img.shields.io/badge/-warning-yellow)

  Vssue 是用 Vue2 编写的，作者 [meteorlxy](https://github.com/meteorlxy) 尚未使其与 Vue3 兼容

- Valine 服务被移除 ![移除](https://img.shields.io/badge/-removed-red)

  Valine 缺乏维护，并且它可能会泄露你的隐私。你应该改用 [Waline](https://waline.js.org)。
