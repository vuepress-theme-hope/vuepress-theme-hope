---
title: 迁移至最新版
icon: code-compare
---

## 新选项

- `update`: 控制 SW 的更新逻辑

  - `"disabled"`: 即使有新的 service worker 也不做任何事情，新的 service work 开始等待后，会在用户下次访问时接管页面，让用户获得新内容。

  - `"available"`: 仅当新的 service worker 可用时才显示更新弹出窗口

  - `"hint"`: 显示更新内容可用提示，并允许用户立即刷新。当新的 SW 成功注册后，将转为更新内容就绪弹窗。

    当你希望用户立即查看新文档时，这很有帮助。

  - `"force"`: 立即注销当前 Service Worker 然后刷新以获取新内容

- `appendBase`: 自动向 `manifest` 选项插入 `base`

- `hintComponent`: 检测到新内容的提示组件

- shouldPrefetch 提示: 现在插件将检查配置文件中的 `shouldPrefetch` 选项并警告你禁用它。

## 选项变更

- `cacheHTML` 默认值由 `true` 改为 `false`

  这能有效降低 SW 更新时间

- `cacheMaxSize` 重命名为 `maxSize`

- `popupComponent` 重命名为 `updateComponent`

  这是因为我们新增了一个提示弹窗，所以需要避免名称混淆

## 破坏性变更

- `showInstall` 被移除
