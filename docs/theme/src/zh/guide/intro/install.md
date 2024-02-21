---
title: 安装/使用
icon: download
order: 2
category:
  - 快速上手
tag:
  - 快速上手
  - 安装
  - 使用
---

## 要求

- 环境: LTS 版本 的 Node.js（18、20）
- 包管理器: npm >= 8、yarn >= 2 或 pnpm >= 7
- 使用 Vue3 的 VuePress2 项目

## 安装

在 `[dir]` 文件夹内新建 vuepress-theme-hope 项目:

::: code-tabs#shell

@tab pnpm

```bash
pnpm create vuepress-theme-hope [dir]
```

@tab yarn

```bash
yarn create vuepress-theme-hope [dir]
```

@tab npm

```bash
npm init vuepress-theme-hope@latest [dir]
```

:::

要将 vuepress-theme-hope 作为文档构建器添加到现有项目中，请在项目根目录中运行以下命令:

::: code-tabs#shell

@tab pnpm

```bash
pnpm create vuepress-theme-hope add [dir]
```

@tab yarn

```bash
yarn create vuepress-theme-hope add [dir]
```

@tab npm

```bash
npm init vuepress-theme-hope@latest add [dir]
```

:::

::: important

这里的 `[dir]` 是一个参数，你需要使用真实的文件夹名称替换它，例如 `docs`、`blog` 或其他你喜欢的名称。

:::

## 使用与配置

请在配置文件中导入并使用 `hopeTheme` 以使用 `vuepress-theme-hope`，`hopeTheme` 接受的第一个参数会作为主题配置：

::: code-tabs#language

@tab TS

```ts {7} title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    // 此处放置主题配置
  }),
});
```

@tab JS

```js {7} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    // 此处放置主题配置
  }),
};
```

:::

你可以查看 [本文档配置][docs-config] 作为一个配置参考。

[docs-config]: https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/docs/theme/src/.vuepress/config.ts
