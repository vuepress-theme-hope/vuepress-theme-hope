---
title: 迁移
icon: code-compare
---

## Changes in Pre-released Versions

## 预发布版本中的变更

- `getTitle` 重命名为 `titleGetter`

- `getIcon` 重命名为 `iconGetter`

- `getOrder` 重命名为 `orderGetter`

- `getIndex` 重命名为 `indexGetter`

- `iconComponent` 被移除，使用 [defineAutoCatalogIconComponent](./config.md#defineautocatalogiconcomponent) 代替

- 我们在几个版本中支持 `indexType` 作为组件 prop，并之后将其移除，因为我们不再需要它。
