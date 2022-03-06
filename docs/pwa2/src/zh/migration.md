---
title: V2 迁移指南
icon: change
---

## 选项变更

- `cacheHTML` 默认值由 `true` 改为 `false`

  这能有效降低 SW 更新时间

- `popupComponent` 重命名为 `updateComponent`

  这是因为我们新增了一个提示弹窗，所以需要避免名称混淆

## 新选项

- `update`: 控制 SW 的更新逻辑

- `appendBase`: 自动向 `manifest` 选项插入 `base`

- `hintComponent`: 检测到新内容的提示组件
