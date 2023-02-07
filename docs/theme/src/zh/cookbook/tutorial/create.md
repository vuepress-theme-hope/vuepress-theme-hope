---
title: 创建项目
icon: folder-plus
order: 2
category:
  - 快速上手
  - 基础知识
  - 教程
tag:
  - 模板
---

此教程将指引你创建一个 VuePress Theme Hope 项目。

<!-- more -->

## 选择合适的项目位置

为了避免偶然间触发一些奇怪的问题，而你自己不会解决，请尽量避免使用包含中文文字、表情符号或空格的文件路径 (如: `C:\Users\小张\Desktop\VuePress 项目\Hope 主题❤️\`)。

建议使用纯英文路径 (如: `D:\projects\vuepress-theme-hope\`)。

## 初始化项目

在选定的位置所在文件夹中打开终端。

::: tip 在 Windows 上打开终端

请使用文件管理器打开对应文件夹，之后在上方的地址栏中输入 `cmd` 之后按下回车。

:::

在终端中执行下列命令之一:

```sh
# pnpm
pnpm create vuepress-theme-hope my-docs

# yarn
yarn create vuepress-theme-hope my-docs

# npm
npm init vuepress-theme-hope my-docs
```

::: tip 文件夹参数

这里的 `my-docs` 是一个参数，代表 VuePress Theme Hope 项目的文件夹名称，在本教程中，我们将项目生成至当前目录下的 `my-docs` 文件夹。

如果你有需求，你可以更改此参数来使用一个新文件夹名称。

:::

::: tip 中文显示

如果你的英语很不好，请在第一次选择中通过键盘 `↓` 选择 `简体中文` 并回车来在后续流程中使用中文进行显示。

:::

::: tip 开发服务器

如果你在模板初始化成功后选择立即启动开发服务器，稍等片刻，你就可以在浏览器地址栏输入 `localhost:8080/` 访问开发服务器了。

:::
