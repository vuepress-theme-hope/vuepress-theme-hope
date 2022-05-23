---
title: 迁移至 V2
icon: change
---

从 `@mr-hope/vuepress-plugin-comment` 重命名为 `vuepress-plugin-comment2`。 ⚠

## 新功能

- 添加 `twikoo` 和 `giscus` 评论服务的支持 ![新增](https://img.shields.io/badge/-New-brightgreen)

## 移除

- Vssue 目前缺失 ![警告](https://img.shields.io/badge/-warning-yellow)

  Vssue 是用 Vue2 编写的，作者 [meteorlxy](https://github.com/meteorlxy) 尚未使其与 Vue3 兼容

- Valine 服务被移除 ![移除](https://img.shields.io/badge/-removed-red)

  Valine 缺乏维护，并且它可能会泄露你的隐私。你应该改用 [Waline](https://waline.js.org)。
