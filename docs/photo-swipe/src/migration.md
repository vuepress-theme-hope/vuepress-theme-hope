---
title: Migrating to Latest
icon: code-compare
---

## New Features

- The plugin now uses `photo-swipe` V5, which targets ESM. So options accepted by `photo-swipe` changes.

- You can customize `photo-swipe` via `definePhotoSwipeConfig` in client config file.

- `scrollToClose` option controlling whether to close current image when scrolling

## Breaking Changes

- `option` in plugin options is removed in favor of `definePhotoSwipeConfig`

- `locale` is renamed to `locales`
