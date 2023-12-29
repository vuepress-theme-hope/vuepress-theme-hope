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

本教程介绍 VuePress 项目命令。

<!-- more -->

## 常用命令

- `vuepress dev [dir]` 会启动一个开发服务器，以便让你在本地开发你的 VuePress 站点。
- `vuepress build [dir]` 会将你的 VuePress 站点构建成静态文件，以便你进行后续部署。

::: info 使用模板

如果你在使用 VuePress Theme Hope 模板，你可以在 `package.json` 中发现下列三个命令:

```json
{
  "scripts": {
    "docs:build": "vuepress build src",
    "docs:clean-dev": "vuepress dev src --clean-cache",
    "docs:dev": "vuepress dev src"
  }
}
```

这意味着你可以使用:

- `pnpm docs:dev` 启动开发服务器
- `pnpm docs:build` 构建项目并输出
- `pnpm docs:clean-dev` 清除缓存并启动开发服务器

:::

::: tip 终止开发服务器

如果你需要终止开发服务器，请点击终端，并连续两次按下 `Ctrl + C`。

:::

## 升级版本

如果你需要升级主题和 VuePress 版本，请执行以下命令:

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

::: warning

任何以 `@vuepress/` 开头的官方包应该和 VuePress 保持相同版本。

比如，如果你正在使用 `@vuepress/plugin-search` 和 `@vuepress/utils`，你应该确保他们和 `vuepress` 版本相同。

另外，如果你使用了其他第三方插件，请确保它兼容你要升级到的 VuePress 版本。

:::
