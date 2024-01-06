---
title: 迁移至最新版
icon: code-compare
---

## 新功能

- 现在此插件使用 `photo-swipe` V5 版本。 V5 使用 ESM 重构，具有更小的大小。所以 `photo-swipe` 可接受的选项有所改变。

- 你可以通过在[客户端配置文件][client-config]中使用 `definePhotoSwipeConfig` 来自定义 `photo-swipe`。

- `scrollToClose` 选项控制滚动时是否关闭当前图片

## 破坏性变更

- 插件选项中的 `option` 被移除，改为使用 `definePhotoSwipeConfig`

- `locale` 选项改名为 `locales`

[client-config]: https://vuejs.press/zh/guide/configuration.html#%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6
