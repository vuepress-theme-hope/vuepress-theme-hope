---
title: 项目命令
icon: flag
order: 3
category:
  - 快速上手
  - 基础知识
  - 教程
tag:
  - 项目命令
---

本教程将介绍 VuePress 项目的管理命令，涵盖本地开发、生产构建及版本更新。

<!-- more -->

## 常用命令

- `vuepress dev <dir>`: 启动本地开发服务器，用于实时预览文档修改。
- `vuepress build <dir>`: 将 VuePress 站点构建为用于部署的静态文件。

:::: info 使用模板脚本

如果你正在使用 VuePress Theme Hope 模板，可以在 `package.json` 中找到以下三个预设命令：

```json
{
  "scripts": {
    "docs:build": "vuepress build src",
    "docs:clean-dev": "vuepress dev src --clean-cache --clean-temp",
    "docs:dev": "vuepress dev src"
  }
}
```

这意味着你可以直接运行以下指令：

::: tabs#shell

@tab pnpm

1. `pnpm docs:dev`: 启动开发服务器。
2. `pnpm docs:build`: 执行项目构建并输出静态文件。
3. `pnpm docs:clean-dev`: 清除缓存并启动开发服务器。

@tab yarn

1. `yarn docs:dev`: 启动开发服务器。
2. `yarn docs:build`: 执行项目构建并输出静态文件。
3. `yarn docs:clean-dev`: 清除缓存并启动开发服务器。

@tab npm

1. `npm run docs:dev`: 启动开发服务器。
2. `npm run docs:build`: 执行项目构建并输出静态文件。
3. `npm run docs:clean-dev`: 清除缓存并启动开发服务器。

:::

::::

::: tip 终止开发服务器
如需停止开发服务器，请点击终端窗口并按下 `Ctrl + C`。
:::

## 更新版本

执行以下命令即可一键升级你的主题和 VuePress 版本：

::: code-tabs#shell

@tab pnpm

```bash
pnpm dlx vp-update
```

@tab yarn

```bash
yarn dlx vp-update
```

@tab npm

```bash
npx vp-update
```

:::
