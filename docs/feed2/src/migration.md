---
title: Migration Guide
icon: change
---

Name changed from `@mr-hope/vuepress-feed` to `vuepress-plugin-feed2`. ⚠

## Output Option changes

- Move all output options from `ouput` option to plugin option root and rename them.

- Now the plugin no longer generates the three formats by default, you need to manually enable it to output format you need.

## New Features

- Add `customElements` options to controll which element should be removed in feed

- Multi-category support ![New](https://img.shields.io/badge/-new-brightgreen)

- Fully customizable feed generation via `getter` option ![NEW](https://img.shields.io/badge/-new-brightgreen)

- Prettier log output ![improved](https://img.shields.io/badge/-improved-blue)

- Supports removing custom components and elements through `customElements` options ![NEW](https://img.shields.io/badge/-new-brightgreen)
