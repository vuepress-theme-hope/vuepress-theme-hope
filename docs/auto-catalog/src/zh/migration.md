---
title: 迁移
icon: code-compare
---

## 传统模式

你可以在调用 `autoCatalogPlugin` 时传递第二个参数 `true` 以启用传统模式，插件将尝试提供旧选项兼容。

## 预发布版本中的变更

- `getTitle`, `titleGetter`, `getIcon`, `iconGetter`, `getOrder`, `orderGetter`, `getIndex`, `indexGetter`, `iconComponent`. `defineAutoCatalogIconComponent` 被 [`defineAutoCatalogGetter`](./config.md#defineautocataloggetter) 代替

- 我们在几个版本中支持 `indexType` 作为组件 prop，并之后将其移除，因为我们不再需要它。
