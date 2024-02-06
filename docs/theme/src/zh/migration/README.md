---
title: V2 迁移指南
icon: code-compare
category:
  - 迁移
tag:
  - 迁移
---

本指南帮助你从 V1 迁移至 V2。

<!-- more -->

## 更新到 V2 的理由

V2 带来了很大的性能提升与很多新功能，详见 [V2 亮点](./highlight.md)。

## 升级到 V1 最新版

升级到最新版 V1 是迁移的第一步。在升级到最新版 V1 的过程中，你可以查看 [V1 变更日志](https://vuepress-theme-hope.github.io/v1/zh/changelog.html) 来适配 V1 中进行的变更。

## 开始从 V1 迁移

在大多数情况下，你应该能够将 `vuepress` 和 `vuepress-theme-hope` 更新到最新的 v2 版本，并直接运行 v1 项目。

迁移助手会自动将你的 v1 配置转换为 v2 配置，并提示你它转换的已弃用选项和删除的不支持选项。此外，所有页面的 Frontmatter 将从 v1 语法转换为 v2。

你需要做的就是:

1. 安装 `vuepress@next` 和 `vuepress-theme-hope`;

1. 尝试启动项目，阅读日志;

1. 根据日志依次更改每个页面的 Frontmatter;

1. 根据日志更改配置文件。

   如果你开始导入 `hopeTheme` 并在迁移期间调用它，则应通过 `hopeTheme(themeOptions, true)` 调用它，因为第二个参数表示在 V1 旧模式下运行。

1. 在`.vuepress/styles`下，将你的 `index.styl` 转换为 `index.scss`，将 `palette.styl` 转换为 `palette.scss` 和`config.scss` ，因为 v2 样式系统基于 SCSS.

1. 将 `.vuepress/components` 下的组件转换为 Vue3 语法，并使用 `@vuepress/plugin-register-components@next` 插件注册它们。

1. 成功清除所有提示后，删除 `hopeTheme` 中的第二个参数 `true`。

## V2 迁移指南

以下页面分别列出了 V1 到 V2 之间发生的更改。

- [配置迁移指南](config.md)
- [页面迁移指南](page.md)
- [样式迁移指南](style.md)
