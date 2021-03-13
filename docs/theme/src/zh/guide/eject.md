---
title: 主题弹出
icon: launch
---

如果主题内置的功能选项都不能满足你对主题的定制要求，或者你想要对主体做二次开发与定制，主题为你提供了很方便的弹出命令。

你可以很方便的使用 `vuepress eject-hope [target-dir]` 命令，来将整个主题文件弹出到对应的目录。

在执行完命令弹出主题到 `.vuepress/theme` 文件夹后，你便可以修改本地主题，以完成你对主题的更改。

::: tip

你需要引入并使用本地主题的 config 函数，并移除 `.vuepress/theme/node/defaultConfig.js` 中的 `theme: 'hope'`。

:::
