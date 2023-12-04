---
title: Migrating to Latest
icon: code-compare
---

## New Options

- `update`: control the update logic of SW

  - `"disabled"`: Do nothing even when new service worker is available. After new service work succeeds installing and starts waiting, it will control page and provide new content in next visit.

  - `"available"`: Only display update popup when the new service worker is available

  - `"hint"`: Display a hint to let user choose to refresh immediately

  - `"force"`: unregister current service worker immediately then refresh to get new content

- `appendBase`: automatically insert `base` to the `manifest` option

- `hintComponent`: Hint component for detecting new content

- shouldPrefetch hint: Now the plugin will check `shouldPrefetch` option in config file and warn you to disable it.

## Changed Options

- `cacheHTML` default value changed from `true` to `false`

  This can effectively reduce the SW update time

- `cacheMaxSize` is renamed to `maxSize`

- `popupComponent` renamed to `updateComponent`

  This is because we added a new prompt popup window, so we need to avoid name confusion

## Breaking Changes

- `showInstall` is removed
