---
title: 目录页面
icon: network-wired
order: 6
category:
  - 功能
tag:
  - 目录
  - 功能
---

VuePress Theme Hope 通过 <ProjectLink name="auto-catalog" path="/zh/">`vuepress-plugin-catalog`</ProjectLink> 提供目录组件和目录页自动生成。

<!-- more -->

## 自动目录页生成

该功能是默认启用的，如果文件夹下没有 `README.md`，主题会为自动为它生成一个目录页。如需禁用，请将 `plugin.autoCatalog` 设置为 `false`。

你可以在主题选项中通过 `plugin.autoCatalog` 来控制它，比如:

- 通过 `plugin.autoCatalog.exclude` 从目录生成中排除一些文件夹
- 通过 `plugin.autoCatalog.frontmatter` 来控制 frontmatter 的生成。

有关详细配置，请参阅 <ProjectLink name="auto-catalog" path="/zh/config.html">Auto Catalog 插件文档</ProjectLink>。

## 目录组件

你可以直接在 Markdown 中使用 `<AutoCatalog>` 组件来显示目录。

::: md-demo 主页目录案例

<!-- 用于限制高度 -->
<div class="catalog-display-container">
  <AutoCatalog base='/zh/' />
</div>

:::
