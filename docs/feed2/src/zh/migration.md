---
title: 迁移至 V2
icon: change
---

名称从 `@mr-hope/vuepress-feed` 改为 `vuepress-plugin-feed2`. ⚠

## 输出选项变更

- 所有的输出选项从插件选项中的 `output` 选项移出到根选项下，并进行了重命名。

  - `output.atom.enable` 重命名为 `atom`

  - `output.json.enable` 重命名为 `json`

  - `output.rss.enable` 重命名为 `rss`

  - `output.atom.path` 重命名为 `atomOutputFilename`

  - `output.json.path` 重命名为 `jsonOutputFilename`

  - `output.rss.path` 重命名为 `rssOutputFilename`

- 现在插件不会再默认生成三种格式，你需要手动启用以输出需要的格式。

  - `atom`, `json` 和 `rss` 现在默认为 `false`

## 新增功能

- 支持通过 `customElements` 选项移除自定义组件和元素 ![新增](https://img.shields.io/badge/-新增-brightgreen)

- 通过 `getter` 选项完全自定义 Feed 生成 ![新增](https://img.shields.io/badge/-新增-brightgreen)

- 多分类支持 ![新增](https://img.shields.io/badge/-新增-brightgreen)

- 更美观的日志输出 ![改进](https://img.shields.io/badge/-改进-blue)
