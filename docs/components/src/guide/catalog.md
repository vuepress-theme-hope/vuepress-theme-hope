---
title: Catalog
---

This component is used to display catalog.

You can use it in Markdown to add an icon。

<!-- more -->

## Demo

Guide catalog:

<Catalog />

Home catalog:

<Catalog base="/" />

## Props

### base

- Type: `string`
- Default: `Current route path base`

Catalog Base

### level

- Type: `1 | 2 | 3`
- Default: `3`

Max level of catalog.

### titleGetter

- Type: `(meta: RouteMeta) => string`
- Default: `(meta: RouteMeta) => meta["title"]`

Page title getter

### iconGetter

- Type: `(meta: RouteMeta) => string`
- Default: `(meta: RouteMeta) => meta["icon"]`

Page icon getter

### orderGetter

- Type: `(meta: RouteMeta) => string`
- Default: `(meta: RouteMeta) => meta["order"]`

Page order getter

### shouldIndex

- Type: `(meta: RouteMeta) => boolean`
- Default: `(meta: RouteMeta) => meta["index"] !== false`

Whether page should be indexed getter
