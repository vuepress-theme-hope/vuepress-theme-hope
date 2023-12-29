---
title: Migration
icon: code-compare
---

## Legacy Mode

You can pass the second argument `true` to enable legacy mode when calling `autoCatalogPlugin`, and the plugin will try to run with backward compatibility.

## Changes in Pre-released Versions

- `getTitle`, `titleGetter`, `getIcon`, `iconGetter`, `getOrder`, `orderGetter`, `getIndex`, `indexGetter`, `iconComponent`. `defineAutoCatalogIconComponent` are replaced by [`defineAutoCatalogGetter`](./config.md#defineautocataloggetter).

- We support `indexType` as component prop for a couple of versions and remove it has we no longer need it.
