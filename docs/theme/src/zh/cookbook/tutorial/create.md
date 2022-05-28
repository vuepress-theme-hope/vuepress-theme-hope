---
title: 创建项目
icon: add
category:
  - 快速上手
  - 基础知识
  - 教程
tag:
  - 模板
---

此教程将指引你创建一个 VuePress Theme Hope 项目。

## 选择合适的项目位置

为了避免偶然间触发一些奇怪的问题，而你自己不会解决，请尽量避免使用包含中文文字、表情符号或空格的文件路径 (如: `C:\Users\小张\Desktop\VuePress 项目\Hope 主题❤️\`)。

建议使用纯英文路径 (如: `D:\projects\vuepress-theme-hope\`)。

::: tip

如果你是一个新手，我们不建议你在已有项目内使用 VuePress Theme Hope，以避免出现你无法解决问题。请选择一个空文件夹初始化 VuePress Theme Hope。

:::

## 初始化项目

在选定的项目位置所在文件夹打开终端。

::: tip 在 Windows 上打开终端

请使用文件管理器打开对应文件夹，之后在上方的地址栏中输入 `cmd` 之后按下回车。

:::

在终端中执行下列命令:

```sh
pnpm create vuepress-theme-hope@next docs

# 或

npm create vuepress-theme-hope@next docs
```

::: tip 位置参数

这里的 `docs` 是一个参数，代表 VuePress 项目的文件夹名称，在本教程中，我们将 VuePress 项目生成至项目文件夹下的 `docs` 子文件夹。

如果你有需求，你可以更改此参数来使用一个新文件夹，或使用 `.` 直接使用当前的文件夹。

如果你是一个小白，请保持默认的 `docs` 参数不变，以更好地阅读接下来的章节。

:::

::: tip 中文显示

如果你的英语很不好，请在第一次选择中通过键盘 `↓` 选择 `简体中文` 并回车来在后续流程中使用中文进行显示。

:::

::: tip 开发服务器

如果你在模板初始化成功后选择立即启动开发服务器，稍等片刻，你就可以在浏览器地址栏输入 `localhost:8080/` 访问开发服务器了。

:::
