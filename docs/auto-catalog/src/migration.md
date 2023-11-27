---
title: Migration
icon: code-compare
---

## Legacy Mode

You can pass the second argument `true` to enable legacy mode when calling `autoCatalogPlugin`, and the plugin will try to run with backward compatibility.

## Changes in Pre-released Versions

- `getTitle` is renamed to `titleGetter`

- `getIcon` is renamed to `iconGetter`

- `getOrder` is renamed to `orderGetter`

- `getIndex` is renamed to `indexGetter`

- `iconComponent` is removed in favor of [defineAutoCatalogIconComponent](./config.md#defineautocatalogiconcomponent)

- We support `indexType` as component prop for a couple of versions and remove it has we no longer need it.
