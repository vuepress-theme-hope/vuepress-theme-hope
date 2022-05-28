---
title: 迁移至 V2
icon: change
---

## 新功能

- JSON-LD 支持

  该插件现在可以为你生成 JSON-LD 脚本标签，并提供一个选项 `jsonLd` 让你自定义 JSON-LD 属性。

- 自动描述生成

  该插件可以通过 `autoDescription` 选项自动为你生成描述

- 规范链接

  你可以通过 `canonicalLink` 选项设置规范链接。当你的文档部署在多个地方时，它很有用。

## 更改选项

- `customMeta` 重命名为 `customHead`

  现在你可以编辑所有 `<head>` 标签，而不是仅 `<meta>` 标签。
