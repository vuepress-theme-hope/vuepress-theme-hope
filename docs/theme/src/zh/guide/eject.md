---
title: 主题弹出
icon: launch
---

如果主题内置的功能选项都不能满足你对主题的定制要求，或者你想要对主体做二次开发与定制，主题为你提供了很方便的弹出命令。

你可以很方便的使用 `vuepress eject-hope [docs-dir]` 命令，来将整个主题文件弹出到对应的目录。

在执行完命令弹出主题到 `.vuepress/theme` 文件夹后，你便在本地文件夹下修改主题，以完成所需的定制更改。

::: warning

您必须手动将 `theme` 选项设为 `path.resolve(__dirname, './theme')` 以使用本地主题。否则，使用的主题将仍然是 `vuerpess-theme-hope`。

:::
