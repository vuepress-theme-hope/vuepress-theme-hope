---
title: V2 Migration
icon: change
---

## Changed Options

- `cacheHTML` default value changed from `true` to `false`

  This can effectively reduce the SW update time

- `popupComponent` renamed to `updateComponent`

  This is because we added a new prompt popup window, so we need to avoid name confusion

## New Options

- `update`: control the update logic of SW

- `appendBase`: automatically insert `base` to the `manifest` option

- `hintComponent`: Hint component for detecting new content
