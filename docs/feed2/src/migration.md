---
title: V2 Migration
icon: change
---

Name changed from `@mr-hope/vuepress-feed` to `vuepress-plugin-feed2`. ⚠

## Output Option changes

- Move all output options from `output` option to plugin option root and rename them.

  - `output.atom.enable` renamed to `atom`

  - `output.json.enable` renamed to `json`

  - `output.rss.enable` renamed to `rss`

  - `output.atom.path` renamed to `atomOutputFilename`

  - `output.json.path` renamed to `jsonOutputFilename`

  - `output.rss.path` renamed to `rssOutputFilename`

- Now the plugin no longer generates the three formats by default, you need to manually enable it to output format you need.

  - `atom`, `json` and `rss` is `false` by default

## New Features

- Supports removing custom components and elements through `customElements` options ![NEW](https://img.shields.io/badge/-new-brightgreen)

- Customize feed generation via `getter` option ![NEW](https://img.shields.io/badge/-new-brightgreen)

- Multi-category support ![New](https://img.shields.io/badge/-new-brightgreen)

- Prettier log output ![improved](https://img.shields.io/badge/-improved-blue)
